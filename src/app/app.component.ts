import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core'; 

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})

export class AppComponent {
    toggleLanguage: boolean = true;

    constructor(private translate: TranslateService) {
        translate.setDefaultLang('en');
        localStorage.setItem('locale', 'en');
    }

    useLanguage(language: string) {
        this.translate.use(language);
        localStorage.setItem('locale', language);
        this.toggleLanguage = !this.toggleLanguage;
    }
}

// https://www.codeandweb.com/babeledit/tutorials/how-to-translate-your-angular8-app-with-ngx-translate