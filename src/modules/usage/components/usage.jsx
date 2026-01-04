"use client"
import { useAuth } from "@clerk/nextjs";
import { useStatus } from "../hooks";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import Link from "next/link";
import { useEffect, useState } from "react";

const formatTime = (ms) => {
  if (!ms || ms <= 0) return "0s";
  const seconds = Math.floor(ms / 1000);
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  
  if (minutes > 0) {
    return `${minutes}m ${remainingSeconds}s`;
  }
  return `${remainingSeconds}s`;
};

export const Usage = () => {
  const { data, isLoading, error } = useStatus();
  const { has } = useAuth();
  const hasProAccess = has({ plan: "pro" });
  const [timeRemaining, setTimeRemaining] = useState(0);

  useEffect(() => {
    if (data?.msBeforeNext) {
      setTimeRemaining(data.msBeforeNext);
      const interval = setInterval(() => {
        setTimeRemaining((prev) => {
          if (prev <= 1000) {
            clearInterval(interval);
            return 0;
          }
          return prev - 1000;
        });
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [data?.msBeforeNext]);

  if (isLoading) {
    return (
      <Card className="w-full">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
          <Skeleton className="h-6 w-20" />
          <Skeleton className="h-5 w-12 rounded-full" />
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <div className="flex items-baseline justify-between">
              <Skeleton className="h-8 w-32" />
              <Skeleton className="h-4 w-24" />
            </div>
            <Skeleton className="h-2 w-full" />
          </div>
          <div className="flex items-center justify-between">
            <Skeleton className="h-16 w-24" />
            <Skeleton className="h-16 w-24" />
          </div>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="w-full border-destructive">
        <CardContent className="pt-6">
          <div className="text-sm text-destructive">Error: {error.message}</div>
        </CardContent>
      </Card>
    );
  }

  if (!data) return null;

  const remainingPoints = data?.remainingPoints ?? 0;
  const maxPoints = data?.maxPoints ?? 0;
  const consumedPoints = data?.consumedPoints ?? 0;
  const usagePercentage = maxPoints > 0 ? ((maxPoints - remainingPoints) / maxPoints) * 100 : 0;
  const isLowOnPoints = remainingPoints <= maxPoints * 0.2;

  return (
    <Card className={`w-full ${hasProAccess ? "border-primary/50" : ""}`}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
        <CardTitle className="text-lg font-semibold">Usage</CardTitle>
        <Badge variant={hasProAccess ? "default" : "outline"}>
          {hasProAccess ? "Pro" : "Free"}
        </Badge>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Points Display */}
        <div className="space-y-2">
          <div className="flex items-baseline justify-between">
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-bold">{remainingPoints}</span>
              <span className="text-sm text-muted-foreground">/ {maxPoints} points</span>
            </div>
            {/* {timeRemaining > 0 && (
              <div className="text-xs text-muted-foreground">
                Resets in {formatTime(timeRemaining)}
              </div>
            )} */}
          </div>
          <Progress 
            value={usagePercentage} 
            className={`h-2 ${isLowOnPoints && !hasProAccess ? "bg-destructive/20" : ""}`}
          />
        </div>

        {/* Stats */}
        <div className="flex items-center justify-between text-sm">
          <div className="flex flex-col gap-1">
            <span className="text-muted-foreground">Used</span>
            <span className="font-medium">{consumedPoints} points</span>
          </div>
          <div className="flex flex-col gap-1 text-right">
            <span className="text-muted-foreground">Available</span>
            <span className="font-medium">{remainingPoints} points</span>
          </div>
        </div>

        {/* Upgrade CTA for Free Users */}
        {!hasProAccess && (
          <div className="pt-2 border-t">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div className="flex-1">
                <p className="text-sm font-medium mb-1">Upgrade to Pro</p>
                <p className="text-xs text-muted-foreground">
                  Get 20x more points ({maxPoints * 20} points) and unlock premium features
                </p>
              </div>
              <Link href="/pricing">
                <Button size="sm" className="w-full sm:w-auto">
                  Upgrade Now
                </Button>
              </Link>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};