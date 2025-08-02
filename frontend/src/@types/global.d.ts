export {}

declare global {
  type UserData = {
    username: string;
    email: string;
    password: string;
    role: string;
  }

  type FileFilter = {
    query: string;
    page: number;
  }

  type TicketFilter = FileFilter & {
    sortType: string;
    order: number;
    active: boolean;
  }

  type Modifications = {
    title: string;
    description: string;
    priority: number;
    team: string;
  }

  type TicketPreview = Modifications & {
    _id: string;
    issued_user: string;
    updatedAt: Date;
    resolved: boolean;
  }

  type TicketDetails = TicketPreview & {
    issued_user_id: string;
    createdAt: Date;
    image_str: [string];
  }
}
