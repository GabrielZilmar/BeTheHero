import express from "express";

import OngController from "./Controllers/Ongs";
import IncidentController from "./Controllers/Incident";
import ProfileController from "./Controllers/Profile";
import SessionController from "./Controllers/Session";

const routes = express.Router();

/**
 * Ongs Routes
 */
routes.post("/ong", OngController.store);
routes.get("/ongs", OngController.list);
routes.get("/ong/:id", OngController.show);
routes.put("/ong/:id", OngController.update);
routes.delete("/ong/:id", OngController.delete);

/**
 * Profile Routes
 */
routes.get("/profile", ProfileController.list);

/**
 * Session Routes
 */
routes.put("/session", SessionController.store);

/**
 * Incidents Routes
 */
routes.post("/incident", IncidentController.store);
routes.get("/incident/:id", IncidentController.show);
routes.get("/incidents", IncidentController.list);
routes.put("/incident/:id", IncidentController.update);
routes.delete("/incident/:id", IncidentController.delete);

export default routes;
