import { Job } from './job';
export class Company {
    id: string;
    name: string;
    address: string;
    country: string;
    website: string;
    contact: string;
    summary: string;
    jobs: Job[];
    reviews: [];
    members: [];

    constructor(obj?: any) {
        this.id = obj && obj.id || null;
        this.name = obj && obj.name || null;
        this.website = obj && obj.website || null;
        this.country = obj && obj.country || null;
        this.contact = obj && obj.contact || null;
        this.jobs = obj && obj.jobs || [];
        this.summary = obj && obj.summary || null;
        this.reviews = obj && obj.reviews || [];
        this.members = obj && obj.members || []
    }
}
