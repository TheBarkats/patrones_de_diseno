import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { DatabaseConnection } from './singleton.model';
import { SingletonService } from './singleton.service';

@Component({
  selector: 'app-singleton',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './singleton.component.html',
  styleUrls: ['./singleton.component.css'],
})
export class SingletonComponent {
  isConnected: boolean = false;
  queryResult: string = '';
  connections: any[] = [];
  instanceInfo: any = null;
  sameInstance: boolean = false;

  constructor(private service: SingletonService) {}

  verifyInstance(): void {
    const result = this.service.testInstances();
    this.instanceInfo = result;
    this.sameInstance = result.sameInstance;
  }

  connectDatabase(): void {
    const db = DatabaseConnection.getInstance();
    db.connect();
    this.isConnected = true;
    const status = db.getStatus();
    this.connections.push({
      time: new Date().toLocaleTimeString(),
      status: 'CONECTADO ✅',
      connectionId: status.connectionId,
    });
  }

  executeQuery(sql: string): void {
    const db = DatabaseConnection.getInstance();
    this.queryResult = db.query(sql);
    if (this.queryResult.includes('✅')) {
      this.connections.push({
        time: new Date().toLocaleTimeString(),
        status: `Query ejecutada: ${sql.substring(0, 30)}...`,
        connectionId: db.getStatus().connectionId,
      });
    }
  }

  disconnectDatabase(): void {
    const db = DatabaseConnection.getInstance();
    db.disconnect();
    this.isConnected = false;
    const status = db.getStatus();
    this.connections.push({
      time: new Date().toLocaleTimeString(),
      status: 'DESCONECTADO ❌',
      connectionId: status.connectionId,
    });
  }

  clearHistory(): void {
    this.connections = [];
  }
}