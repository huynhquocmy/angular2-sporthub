import { Component, AfterViewInit } from '@angular/core';
import { LangService } from '../../_lang/lang.service';
declare var $: any;
@Component({
  templateUrl: './footer.component.html',
  selector: 'layout-footer',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements AfterViewInit {

	LANG:any = {
	};
  	constructor(private langService: LangService) {
	  	this.langService.getLang()
	  	.subscribe((res) => {
	  	  this.LANG = res;
	  	});
  	}

  ngAfterViewInit() {
    setTimeout(() => {
      $('#trusted-content').css('opacity', 1);
    }, 2000);
  }

  setLanguage(langMode: string) {
  	this.langService.setLang(langMode);
  }
};
