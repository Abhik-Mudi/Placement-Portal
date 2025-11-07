import express from 'express';
import { getSavedJobs, scrapeAllJobs } from '../controllers/job.controller.js';

const jobRouter=express.Router();

jobRouter.get("/", getSavedJobs)
jobRouter.post('/scrape', scrapeAllJobs)

export default jobRouter;