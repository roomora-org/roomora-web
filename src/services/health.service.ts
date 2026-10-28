import api from "./api";
import type {
  HealthLive,
  HealthReady,
  HealthMetrics,
} from "@/types";

export const healthService = {
  /** Lightweight liveness check (server is up) */
  async getLive(): Promise<HealthLive> {
    const { data } = await api.get<HealthLive>("/health/live");
    return data;
  },

  /** Full readiness (database, memory, etc.) */
  async getReady(): Promise<HealthReady> {
    const { data } = await api.get<HealthReady>("/health/ready");
    return data;
  },

  /** Detailed metrics for Platform Admin dashboard */
  async getMetrics(): Promise<HealthMetrics> {
    const { data } = await api.get<HealthMetrics>("/health/metrics");
    return data;
  },
};