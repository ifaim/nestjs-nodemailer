import { Inject, Injectable } from '@nestjs/common';
import { NODEMAILER_TRANSPORTER } from './nodemailer.constant';
import { Transporter, SendMailOptions, SentMessageInfo } from 'nodemailer';
import { Token } from 'nodemailer/lib/xoauth2';

@Injectable()
export class NodemailerService {
    constructor(
        @Inject(NODEMAILER_TRANSPORTER) private readonly transporter: Transporter
    ) { }

    on(name: 'idel', fn: () => void): void;
    on(name: 'token', fn: (token: Token) => void): void;
    on(name: 'error', fn: (error: Error) => void): void;
    on(name, fn): void {
        this.transporter.on(name, fn);
    }

    set(name: 'oauth2_provision_cb', fn: (user, renew, callback) => void): void;
    set(name: string, fn: any): void;
    set(name, fn): void {
        this.transporter.set(name, fn);
    }

    async sendMail(options: SendMailOptions): Promise<SentMessageInfo> {
        return await this.transporter.sendMail(options);
    }
}