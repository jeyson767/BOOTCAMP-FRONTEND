import React from 'react';

export function MovieCardSkeleton() {
  return (
    <div className="bg-white rounded-2xl overflow-hidden border border-slate-100 shadow-sm animate-pulse">
      {/* Poster skeleton */}
      <div className="aspect-[2/3] w-full skeleton-shimmer" />
      
      {/* Content skeleton */}
      <div className="p-4 space-y-3">
        <div className="flex items-center justify-between">
          <div className="h-4 w-16 bg-slate-100 rounded-md skeleton-shimmer" />
          <div className="h-4 w-10 bg-slate-100 rounded-md skeleton-shimmer" />
        </div>
        <div className="h-5 w-3/4 bg-slate-200 rounded-md skeleton-shimmer" />
        <div className="flex gap-1.5 pt-1">
          <div className="h-4 w-12 bg-slate-100 rounded-full skeleton-shimmer" />
          <div className="h-4 w-16 bg-slate-100 rounded-full skeleton-shimmer" />
        </div>
      </div>
    </div>
  );
}

export function HeroBannerSkeleton() {
  return (
    <div className="relative w-full h-[400px] rounded-3xl overflow-hidden bg-white border border-slate-200/80 shadow-sm skeleton-shimmer mb-8 flex items-end p-8">
      <div className="w-full max-w-2xl space-y-3">
        <div className="h-5 w-24 bg-slate-200 rounded-full" />
        <div className="h-8 w-2/3 bg-slate-300 rounded-xl" />
        <div className="h-12 w-full bg-slate-100 rounded-xl" />
        <div className="flex gap-3 pt-2">
          <div className="h-10 w-32 bg-slate-200 rounded-xl" />
          <div className="h-10 w-32 bg-slate-100 rounded-xl" />
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
