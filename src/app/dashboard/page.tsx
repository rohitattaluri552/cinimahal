"use client";

import DashboardNavbar from "../components/dashboard-navbar";
import MoviesGrid from "../components/movies-grid";
import { SAMPLE_MOVIES } from "../data-center/movies-json";

export default function DashboardPage() {
  return (
    <div>
      <DashboardNavbar />
      <MoviesGrid movies={SAMPLE_MOVIES} title="Featured Movies" />
    </div>
  );
}
