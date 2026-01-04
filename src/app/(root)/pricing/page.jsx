"use client"
import { PricingTable } from '@clerk/nextjs'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

export default function PricingPage() {
  return (
    <div className="w-full min-h-full flex flex-col items-center justify-center">
      <section className="flex flex-col w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 gap-8 items-center justify-center min-h-full py-12 sm:py-16 lg:py-20">
        {/* Header Section */}
        <div className="flex flex-col items-center text-center gap-4 max-w-3xl">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight">
            Choose Your Plan
          </h1>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl">
            Select the perfect plan for your needs. All plans include our core features with flexible options to scale.
          </p>
        </div>

        {/* Pricing Table Container */}
        <Card className="w-full max-w-5xl shadow-lg">
          <CardHeader className="text-center pb-4">
            <CardTitle className="text-2xl sm:text-3xl">Pricing Plans</CardTitle>
            <CardDescription className="text-base sm:text-lg">
              Compare features and find the plan that works best for you
            </CardDescription>
          </CardHeader>
          <CardContent className="px-4 sm:px-6 lg:px-8 pb-6 sm:pb-8">
            <div className="w-full overflow-x-auto">
              <div className="min-w-full">
                <PricingTable />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Additional Info Section */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-8 mt-4 text-center">
          <div className="flex flex-col gap-2 max-w-xs">
            <h3 className="font-semibold text-lg">No Hidden Fees</h3>
            <p className="text-sm text-muted-foreground">
              Transparent pricing with no surprises. Cancel anytime.
            </p>
          </div>
          <div className="flex flex-col gap-2 max-w-xs">
            <h3 className="font-semibold text-lg">30-Day Money Back</h3>
            <p className="text-sm text-muted-foreground">
              Try risk-free. If you're not satisfied, get a full refund.
            </p>
          </div>
          <div className="flex flex-col gap-2 max-w-xs">
            <h3 className="font-semibold text-lg">24/7 Support</h3>
            <p className="text-sm text-muted-foreground">
              Our team is here to help you whenever you need assistance.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}