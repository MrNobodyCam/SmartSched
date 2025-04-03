<?php

use Illuminate\Foundation\Inspiring;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\Mail;
use App\Mail\ContactUsMail;

Artisan::command('inspire', function () {
    $this->comment(Inspiring::quote());
})->purpose('Display an inspiring quote');

Artisan::command('send-welcome-mail', function () {
    Mail::to(env('MAIL_TO'))->send(new ContactUsMail("Jon"));
    // Also, you can use specific mailer if your default mailer is not "mailtrap" but you want to use it for welcome mails
    // Mail::mailer('mailtrap')->to('testreceiver@gmail.com')->send(new WelcomeMail("Jon"));
})->purpose('Send welcome mail');