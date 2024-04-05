import {Component, inject} from '@angular/core';
import {MatTreeNestedDataSource, MatTreeModule} from "@angular/material/tree";
import {MatIcon} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {NestedTreeControl} from "@angular/cdk/tree";
import {Topic} from "@interface/topic";
import {TopicService} from "@service/topic/topic.service";
import {RouterLink} from "@angular/router";
import {NgIf} from "@angular/common";
import {MatProgressBar} from "@angular/material/progress-bar";
import {BaseService} from "@service/base/base.service";

@Component({
  selector: 'app-overview',
  standalone: true,
  imports: [
    MatTreeModule,
    MatIcon,
    RouterLink,
    MatButtonModule,
    NgIf,
    MatProgressBar
  ],
  templateUrl: './overview.component.html',
  styleUrl: './overview.component.css'
})
export class OverviewComponent {
  topicService = inject(TopicService);
  baseService = inject(BaseService);
  treeControl = new NestedTreeControl<Topic>(node => node.children);
  dataSource = new MatTreeNestedDataSource<Topic>();

  isLoading = false;

  constructor() {
    this.isLoading = true;
    this.topicService.getAll().subscribe({
      next: res => {
        this.isLoading = false;
        this.dataSource.data = res.data;
      },
      error: err => {
        this.isLoading = false;
        this.baseService.handleError(err);
      }
    })
  }

  hasChild = (_: number, node: Topic) => !!node.children && node.children.length > 0;
}
