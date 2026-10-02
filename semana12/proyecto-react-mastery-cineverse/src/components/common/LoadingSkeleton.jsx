import React from 'react';

export function MovieCardSkeleton() {
  return (
    <div className="glass-card rounded-2xl overflow-hidden border border-slate-800 animate-pulse">
      {/* Poster skeleton */}
      <div className="aspect-[2/3] w-full skeleton-shimmer" />
      
      {/* Content skeleton */}
      <div className="p-4 space-y-3">
        <div className="flex items-center justify-between">
          <div className="h-4 w-16 bg-slate-800 rounded-md skeleton-shimmer" />
          <div className="h-4 w-10 bg-slate-800 rounded-md skeleton-shimmer" />
        </div>
        <div className="h-5 w-3/4 bg-slate-700 rounded-md skeleton-shimmer" />
        <div className="flex gap-1.5 pt-1">
          <div className="h-4 w-12 bg-slate-800 rounded-full skeleton-shimmer" />
          <div className="h-4 w-16 bg-slate-800 rounded-full skeleton-shimmer" />
        </div>
      </div>
    </div>
  );
}

export function HeroBannerSkeleton() {
  return (
    <div className="relative w-full h-[480px] rounded-3xl overflow-hidden glass-panel border border-slate-800 skeleton-shimmer mb-10 flex items-end p-8">
      <div className="w-full max-w-2xl space-y-4">
        <div className="h-6 w-28 bg-slate-800 rounded-full" />
        <div className="h-10 w-3/4 bg-slate-800 rounded-xl" />
        <div className="h-16 w-full bg-slate-800/80 rounded-xl" />
        <div className="flex gap-4 pt-2">
          <div className="h-12 w-36 bg-slate-700 rounded-xl" />
          <div className="h-12 w-36 bg-slate-800 rounded-xl" />
        </div>
      </div>
    </div>
  );
}

export function GridSkeleton({ count = 8 }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {Array.from({ length: count }).map((_, i) => (
        <MovieCardSkeleton key={i} />
      ))}
    </div>
  );
}
