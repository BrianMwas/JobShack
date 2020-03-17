export class Application {
	user: string;
	status: Status;
	createdAt: Date;

	constructor (obj?: any) {
		this.user = obj && obj.user || '';
		this.status = obj && obj.status || Status.pending;
		this.createdAt = obj && obj.createdAt || new Date();
	}
}

enum Status {
	pending = "pending",
	accepted = "accepted",
	processed = "processed"
}
