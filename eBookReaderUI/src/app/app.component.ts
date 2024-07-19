import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  constructor() {
    localStorage.setItem(
      'characters',
      JSON.stringify([
        {
          name: 'the',
          description:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris et est at tortor lacinia maximus. Sed tellus enim, vestibulum quis lorem eget, venenatis scelerisque erat. Aenean eu sapien lobortis, interdum metus ac, rutrum leo. Cras congue eros id dolor laoreet accumsan. Vivamus vulputate, velit in efficitur elementum, enim augue pharetra enim, nec lacinia arcu neque euismod neque.',
          imgUrl: './assets/portrait_placeholder_img.png',
        },
      ])
    );
    localStorage.setItem(
      'places',
      JSON.stringify([
        {
          name: 'of',
          description:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris et est at tortor lacinia maximus. Sed tellus enim, vestibulum quis lorem eget, venenatis scelerisque erat. Aenean eu sapien lobortis, interdum metus ac, rutrum leo. Cras congue eros id dolor laoreet accumsan. Vivamus vulputate, velit in efficitur elementum, enim augue pharetra enim, nec lacinia arcu neque euismod neque.',
          imgUrl: './assets/landscape_placeholder_img.png',
        },
      ])
    );
  }
}
