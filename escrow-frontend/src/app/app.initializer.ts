import { Observable } from 'rxjs';
import { Web3Service } from './web3-utils/web3.service';

export function initializeAppFactory(web3Service: Web3Service): () => any {
  return () => {
    web3Service.setLocalhostProvider();
    web3Service.getAllAccountsList();
}
}