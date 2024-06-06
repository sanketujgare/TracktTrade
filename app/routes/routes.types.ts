import { Router } from "express";

export class Route {
  static registeredRoutes: Route[] = [];
  constructor(public path: string, public router: Router) {
    if (!this.path.startsWith("/")) {
      throw new Error("INVALID PATH !!!");
    }
    if (Route.registeredRoutes.find((r) => r.path === this.path)) {
      throw new Error("PATH ALREADY EXISTS");
    }
    Route.registeredRoutes.push(this);
  }
}
