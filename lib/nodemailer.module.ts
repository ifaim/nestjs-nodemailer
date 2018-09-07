import { Module, DynamicModule, Provider } from '@nestjs/common';
import { NodemailerService } from './nodemailer.service';
import { NodemailerModuleOptions, NodemailerModuleAsyncOptions, NodemailerOptionsFactory } from './interfaces';
import { createNodemailerProvider, createNodemailerTransportProvider } from './nodemailer.providers';
import { NODEMAILER_MODULE_OPTIONS } from './nodemailer.constant';

@Module({
    providers: [
        NodemailerService,
        createNodemailerTransportProvider()
    ],
    exports: [NodemailerService]
})
export class NodemailerModule {
    static register(options: NodemailerModuleOptions): DynamicModule {
        return {
            module: NodemailerModule,
            providers: [
                ...createNodemailerProvider(options)
            ]
        };
    }

    static registerAsync(options: NodemailerModuleAsyncOptions): DynamicModule {
        return {
            module: NodemailerModule,
            providers: this.createAsyncProviders(options)
        };
    }

    private static createAsyncProviders(options: NodemailerModuleAsyncOptions): Provider[] {
        if (options.useExisting || options.useFactory) {
            return [this.createAsyncOptionsProvider(options)];
        }
    }

    private static createAsyncOptionsProvider(options: NodemailerModuleAsyncOptions): Provider {
        if (options.useFactory) {
            return {
                provide: NODEMAILER_MODULE_OPTIONS,
                useFactory: options.useFactory,
                inject: options.inject || []
            };
        }
        return {
            provide: NODEMAILER_MODULE_OPTIONS,
            useFactory: async (optionsFactory: NodemailerOptionsFactory) =>
                await optionsFactory.createNodemailerOptions(),
            inject: [options.useExisting || options.useClass]
        };
    }
}