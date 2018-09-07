import { NODEMAILER_MODULE_OPTIONS, NODEMAILER_TRANSPORTER } from './nodemailer.constant';
import { NodemailerModuleOptions } from './interfaces';
import { createTransport } from 'nodemailer';
import { Provider } from '@nestjs/common';

export function createNodemailerProvider(options: NodemailerModuleOptions): any[] {
    return [{ provide: NODEMAILER_MODULE_OPTIONS, useValue: options || {} }];
}

export function createNodemailerTransportProvider(): Provider {
    return {
        provide: NODEMAILER_TRANSPORTER,
        inject: [NODEMAILER_MODULE_OPTIONS],
        useFactory: async (options: NodemailerModuleOptions) => {
            const transpoter = createTransport(options);
            const isVerified = await transpoter.verify();
            if (!isVerified) {
                throw new Error('Transport failed to verified');
            }
            return transpoter;
        }
    };
}
