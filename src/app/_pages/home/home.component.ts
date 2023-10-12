import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from "@angular/router";
import { filter } from 'rxjs/operators'; // Updated import statement

@Component({
    selector: 'home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
    sectionScroll: string | null = null; // Explicitly defined type

    constructor(private router:Router) {}

    // Specified parameter types
    internalRoute(page: string, dst: string): void {
        this.sectionScroll = dst;
        this.router.navigate([page], {fragment: dst});
    }

    doScroll(): void {
        if (!this.sectionScroll) {
            return;
        }
        try {
            const elements = document.getElementById(this.sectionScroll);
            // Checked if elements is not null before calling scrollIntoView
            if(elements) {
                elements.scrollIntoView();
            }
        }
        finally{
            this.sectionScroll = null;
        }
    }

    ngOnInit(): void {
        // Updated to use pipeable operators
        this.router.events.pipe(
            filter(evt => evt instanceof NavigationEnd)
        ).subscribe(() => {
            this.doScroll();
            this.sectionScroll= null;
        });
    }
}
