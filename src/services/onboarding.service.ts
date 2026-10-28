import api from "./api";
import type { AuthResponse, HotelProfile } from "@/types";

export const onboardingService = {
  async complete(profile: HotelProfile): Promise<AuthResponse> {
    const { data } = await api.post<AuthResponse>("/onboarding", {
      hotelName: profile.hotelName,
      city: profile.city,
      country: profile.country,
      address: profile.address,
      starRating: profile.starRating,
      hotelPhone: profile.hotelPhone,
      description: profile.description || undefined,
      alternativePhone: profile.alternativePhone || undefined,
      postalCode: profile.postalCode || undefined,
    });
    return data;
  },
};