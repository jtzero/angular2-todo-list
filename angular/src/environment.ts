import { enableDebugTools, disableDebugTools } from '@angular/platform-browser';
import { enableProdMode, ApplicationRef } from '@angular/core';

if ('production' === ENV) {
  // Production
  disableDebugTools();
  enableProdMode();

} else {
  enableDebugTools();
}
