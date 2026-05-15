import { Injectable } from '@angular/core';
import { DatabaseConnection } from './singleton.model';

@Injectable({ providedIn: 'root' })
export class SingletonService {
  testInstances(): any {
    const db1 = DatabaseConnection.getInstance();
    const db2 = DatabaseConnection.getInstance();
    
    return {
      message: db1 === db2 ? '✅ Es Singleton' : '❌ No es Singleton',
      db1Id: db1.getStatus().connectionId,
      db2Id: db2.getStatus().connectionId,
      sameInstance: db1 === db2,
    };
  }

  demonstrateOperations(): string[] {
    const db = DatabaseConnection.getInstance();
    const logs: string[] = [];

    logs.push('=== DEMOSTRANDO SINGLETON ===');
    db.connect();
    logs.push('✅ Conectado: ' + JSON.stringify(db.getStatus()));
    logs.push(db.query('SELECT * FROM users'));
    db.disconnect();
    logs.push('❌ Desconectado');

    return logs;
  }
}