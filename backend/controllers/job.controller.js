import puppeteer from "puppeteer";
import Job from "../models/Job.js";

async function runPuppeteerScrape(keywords) {
    keywords = keywords.split(" ").join("+")
    const query = keywords ? keywords : '';
    
    const allJobs = [];

    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/98.0.4758.102 Safari/537.36');

    let currentPageUrl = `https://www.foundit.in/search/jobs?${query}`;

    try {
        while (currentPageUrl) {
            
            await page.goto(currentPageUrl);

            await page.waitForSelector('.jobCardWrapper .shadow-job-card');

            const jobsOnPage = await page.evaluate(() => {
                const jobs = [];

                document.querySelectorAll('.jobCardWrapper .shadow-job-card').forEach((el) => {
                    const title = el.querySelector('.jobCardTitle').innerText;
                    const company = el.querySelector('.jobCardCompany').innerText;
                    const jobUrl = el.querySelector('.jobCardTitle a').href;

                    jobs.push({
                        title: title,
                        company: company,
                        jobUrl: jobUrl
                    });
                });
                return jobs;
            });

            allJobs.push(...jobsOnPage);

            const nextButtonUrl = await page.evaluate(() => {
                const nextButton = document.querySelector('li.next a');
                return nextButton ? nextButton.href : null;
            });

            currentPageUrl = nextButtonUrl;

        }

        console.log(allJobs)
        console.log(`Found ${allJobs.length} total "jobs". Saving to DB...`);
        for (const job of allJobs) {
            try {
                await Job.create(job);
            } catch (dbError) {
                if (dbError.code === 11000) {
                    console.log(`Duplicate found, skipping: ${job.title}`);
                } else {
                    console.error(dbError.message);
                }
            }
        }

    } catch (err) {
        console.error('Error during Puppeteer scrape:', err);
    } finally {
        await browser.close();
        console.log('Puppeteer closed. Scrape complete.');
    }
}

export const scrapeAllJobs = async (req, res) => {
    const { keywords } = req.body;
    res.status(202).json({ message: 'Puppeteer scrape started...' });
    runPuppeteerScrape(keywords);
}

export const getSavedJobs = async (req, res)=>{
    try{
        const jobs = await Job.find().sort({ dateScraped: -1 });
        res.status(200).json(jobs);
    }catch(error){
        res.status(500).json({ message: "Error fetching jobs", error: error.message });
    }
}