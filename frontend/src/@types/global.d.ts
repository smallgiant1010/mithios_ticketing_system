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
  }

  type Modifications = {
    title: string;
    priority: number;
    team: string;
  }

  type TicketPreview = Modifications & {
    _id: string;
    issued_user: string;
    updatedAt: Date;
  }

  type TicketDetails = TicketPreview & {
    issued_user_id: string;
    createdAt: Date;
    image_str: [string];
  }
}
