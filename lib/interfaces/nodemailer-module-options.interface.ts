import { ModuleMetadata, Type } from '@nestjs/common/interfaces';
import * as SMTPTransport from 'nodemailer/lib/smtp-transport';
import * as SMTPPool from 'nodemailer/lib/smtp-pool';
import * as StreamTransport from 'nodemailer/lib/stream-transport';
import * as SendmailTransport from 'nodemailer/lib/sendmail-transport';
import * as SESTransport from 'nodemailer/lib/ses-transport';

export type NodemailerModuleOptions = TransportOptionsStatic;

export interface NodemailerOptionsFactory {
    createNodemailerOptions(): Promise<NodemailerModuleOptions> | NodemailerModuleOptions;
}

export interface NodemailerModuleAsyncOptions extends Pick<ModuleMetadata, 'imports'> {
    useExisting?: Type<NodemailerOptionsFactory>;
    useClass?: Type<NodemailerOptionsFactory>;
    useFactory?: (...args: any[]) => Promise<NodemailerModuleOptions> | NodemailerModuleOptions;
    inject?: any[];
}

export type TransportOptionsStatic = SMTPTransport
    | SMTPTransport.Options
    | SMTPPool
    | SMTPPool.Options
    | StreamTransport
    | StreamTransport.Options
    | SendmailTransport
    | SendmailTransport.Options
    | SESTransport
    | SESTransport.Options;