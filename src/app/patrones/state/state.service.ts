import { Injectable } from '@angular/core';
import { MediaPlayer } from './state.model';

@Injectable({ providedIn: 'root' })
export class StateService {
  demonstrateMediaPlayer(): any[] {
    const player = new MediaPlayer();
    const log: any[] = [];

    log.push({ state: player.getState(), action: 'Inicio' });
    log.push({ state: player.getState(), action: player.play() });
    log.push({ state: player.getState(), action: player.play() });
    log.push({ state: player.getState(), action: player.pause() });
    log.push({ state: player.getState(), action: player.pause() });
    log.push({ state: player.getState(), action: player.play() });
    log.push({ state: player.getState(), action: player.stop() });
    log.push({ state: player.getState(), action: player.pause() });

    return log;
  }
}