import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MediaPlayer } from './state.model';

@Component({
  selector: 'app-state',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './state.component.html',
  styleUrls: ['./state.component.css'],
})
export class StateComponent {
  mediaPlayer: MediaPlayer = new MediaPlayer();
  currentState: string = 'DETENIDO';
  isPlaying: boolean = false;
  isPaused: boolean = false;
  playback: { time: string; state: string; action: string }[] = [];
  currentTrack: string = 'Canción Ejemplo - Artista';

  performAction(action: 'play' | 'pause' | 'stop'): void {
    let result = '';
    switch (action) {
      case 'play':
        result = this.mediaPlayer.play();
        break;
      case 'pause':
        result = this.mediaPlayer.pause();
        break;
      case 'stop':
        result = this.mediaPlayer.stop();
        break;
    }

    this.currentState = this.mediaPlayer.getState();
    this.isPlaying = this.currentState === 'REPRODUCIENDO';
    this.isPaused = this.currentState === 'PAUSADO';

    this.playback.unshift({
      time: new Date().toLocaleTimeString(),
      state: this.currentState,
      action: result,
    });

    if (this.playback.length > 10) {
      this.playback.pop();
    }
  }

  resetPlayer(): void {
    this.mediaPlayer = new MediaPlayer();
    this.currentState = 'DETENIDO';
    this.isPlaying = false;
    this.isPaused = false;
    this.playback = [];
  }
}