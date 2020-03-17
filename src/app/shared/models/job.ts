export class Job {
    id: string;
    title: string;
    summary: string;
    country: string;
    description: string;
    company: object;
    type: string;
    industry: string;
    applications: number;
    createdAt: string;

    constructor(obj?: any) {
        this.id = obj && obj.id || null;
        this.title = obj && obj.title || null;
        this.summary = obj && obj.summary || null;
        this.country = obj && obj.country || null;
        this.company = obj && obj.company || null;
        this.description = obj && obj.description || null;
        this.type = obj && obj.type || null;
        this.industry = obj && obj.industry || null;
        this.applications = obj && obj.applications || 0;
        this.createdAt = obj && obj.createdAt || null;
    }
}
