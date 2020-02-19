import {Component, Injector, OnInit} from '@angular/core';
import { NgElement, WithProperties } from '@angular/elements';
import { createCustomElement } from '@angular/elements';
import { FooterElementComponent} from './footer-element/footer-element.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'client';

  constructor(injector: Injector) {

    const footerElement = createCustomElement(FooterElementComponent, {injector});
    customElements.define('app-footer-element', footerElement);

  }
  ngOnInit() {
    const footerEl: NgElement & WithProperties<FooterElementComponent> = document.createElement('app-footer-element') as any;
    document.querySelector('.wrapper').appendChild(footerEl);
  }

}
