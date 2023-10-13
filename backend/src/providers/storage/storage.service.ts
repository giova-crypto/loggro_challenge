import { Storage } from '@google-cloud/storage';
import { Injectable } from '@nestjs/common';

@Injectable()
export class StorageService {
  private storage = new Storage({
    keyFilename: 'latam-airlines-28dd5d51aa70.json', // Ruta a tus credenciales de GCS
    projectId: 'latam-airlines', // ID de tu proyecto en GCP
  });

  getBucket() {
    return this.storage.bucket('loggro-images'); // Nombre de tu bucket en GCS
  }
}
