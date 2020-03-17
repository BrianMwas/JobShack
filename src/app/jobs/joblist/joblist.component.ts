
import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Job } from 'src/app/shared/models/job';

@Component({
  selector: 'app-joblist',
  templateUrl: './joblist.component.html',
  styleUrls: ['./joblist.component.scss']
})
export class JoblistComponent implements OnInit {

  constructor(private router: Router) { }

  @Input()
  jobs: Job[]

  ngOnInit() {
  }

  goto(id) {
    console.log("id", id)
      this.router.navigate(['job', id])
  }
}
