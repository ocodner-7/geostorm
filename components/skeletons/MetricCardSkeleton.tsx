"use client";

import { Metric } from "@/types";
import { MetricCard } from "../MetricCard";

export const MetricCardSkeleton = ({ metric }: { metric: Metric }) => {
  return <MetricCard metric={metric} value="—" unit=""/> 
};