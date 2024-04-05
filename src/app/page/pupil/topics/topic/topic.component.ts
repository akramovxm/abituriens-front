import {Component, inject, Input, OnInit, ViewContainerRef} from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-topic',
  standalone: true,
  imports: [],
  templateUrl: './topic.component.html',
  styleUrl: './topic.component.css'
})
export class TopicComponent implements OnInit {
  @Input('path') path!: string;
  ref = inject(ViewContainerRef);
  router = inject(Router);

  ngOnInit() {
    this.ref.clear();
    try {
      import(`../../../topics-content/${this.path}/${this.path}.component.ts`).then(mod => {
        const componentName = this.toPascalCase(this.path) + 'Component';
        const component = mod[componentName];
        this.ref.createComponent(component);
      });
    } catch (e) {
      console.error(e);
      this.router.navigate(['**'], { skipLocationChange: true });
    }
  }
  toCamelCase(text: string) {
    return text.replace(/-\w/g, this.clearAndUpper);
  }

  toPascalCase(text: string) {
    return text.replace(/(^\w|-\w)/g, this.clearAndUpper);
  }

  clearAndUpper(text: string) {
    return text.replace(/-/, "").toUpperCase();
  }
}
