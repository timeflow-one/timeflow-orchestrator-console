import { RouteConfig } from 'vue-router'

export type MenuItem = {
  icon: string;
  badge?: number;
} & RouteConfig
