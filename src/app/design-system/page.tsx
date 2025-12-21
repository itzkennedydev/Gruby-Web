'use client';

import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';

/**
 * Gruby Design System v2.0 Preview Page
 *
 * SIMPLIFIED COLOR PALETTE:
 * - PRIMARY (#222222): Charcoal - Buttons, text, focus states, logos, nav, tabs, badges
 * - SURFACE: White (#FFFFFF) / Warm Parchment (#FAF9F6) - Backgrounds
 * - BORDER (#D9D9D6): Wolf Gray - Borders, dividers
 */

export default function DesignSystemPage() {
  return (
    <div className="min-h-screen bg-ds-bg p-8">
      <div className="max-w-6xl mx-auto space-y-12">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-ds-text">Gruby Design System v2.0</h1>
          <p className="text-ds-text-muted text-lg">
            Unified cross-platform design tokens
          </p>
        </div>

        {/* Color Palette */}
        <section className="space-y-6">
          <h2 className="text-2xl font-semibold text-ds-text">Color Palette</h2>

          {/* Primitive Colors */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-ds-text-muted">Primitive Colors</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <ColorSwatch name="Charcoal" color="bg-primitive-charcoal" hex="#222222" textLight />
              <ColorSwatch name="White" color="bg-primitive-white border" hex="#FFFFFF" />
              <ColorSwatch name="Warm Parchment" color="bg-primitive-parchment" hex="#FAF9F6" />
              <ColorSwatch name="Wolf Gray" color="bg-primitive-wolf-gray" hex="#D9D9D6" />
              <ColorSwatch name="Olive (deprecated)" color="bg-primitive-olive" hex="#222222" textLight />
              <ColorSwatch name="Burnt Umber" color="bg-primitive-burnt-umber" hex="#9C6B3F" textLight />
              <ColorSwatch name="Clay Taupe" color="bg-primitive-clay-taupe" hex="#B8A89A" />
              <ColorSwatch name="Dried Chili" color="bg-primitive-dried-chili" hex="#7A3E2E" textLight />
            </div>
          </div>

          {/* Semantic Colors */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-ds-text-muted">Semantic Colors</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <ColorSwatch name="Primary" color="bg-ds-primary" hex="#222222" textLight role="Text, buttons, focus, nav, tabs" />
              <ColorSwatch name="Support" color="bg-ds-support" hex="#222222" textLight role="Nav, tabs, badges" />
              <ColorSwatch name="Background" color="bg-ds-bg border" hex="#FFFFFF" role="Main background" />
              <ColorSwatch name="Background Subtle" color="bg-ds-bg-subtle" hex="#FAF9F6" role="Elevated surfaces" />
              <ColorSwatch name="Border" color="bg-ds-border" hex="#D9D9D6" role="Borders, dividers" />
              <ColorSwatch name="Accent Warm" color="bg-ds-accent-warm" hex="#9C6B3F" textLight role="Rewards, highlights" />
              <ColorSwatch name="Danger" color="bg-ds-danger" hex="#7A3E2E" textLight role="Errors, destructive" />
              <ColorSwatch name="Success" color="bg-ds-success" hex="#222222" textLight role="Success states" />
              <ColorSwatch name="Warning" color="bg-ds-warning" hex="#D4A574" role="Warning states" />
            </div>
          </div>
        </section>

        {/* Typography */}
        <section className="space-y-6">
          <h2 className="text-2xl font-semibold text-ds-text">Typography</h2>
          <div className="space-y-4 bg-ds-surface p-6 rounded-card border border-ds-border">
            <p className="text-ds-text text-4xl font-bold">Heading 1 - Charcoal Primary</p>
            <p className="text-ds-text text-2xl font-semibold">Heading 2 - Charcoal Primary</p>
            <p className="text-ds-text text-lg">Body text - Primary text color</p>
            <p className="text-ds-text-muted">Muted text - Olive secondary</p>
            <p className="text-ds-text-subtle">Subtle text - Clay Taupe tertiary</p>
          </div>
        </section>

        {/* Buttons */}
        <section className="space-y-6">
          <h2 className="text-2xl font-semibold text-ds-text">Buttons</h2>
          <div className="flex flex-wrap gap-4 items-center">
            <Button>Primary Button</Button>
            <Button variant="secondary">Secondary Button</Button>
            <Button variant="outline">Outline Button</Button>
            <Button variant="ghost">Ghost Button</Button>
            <Button variant="support">Support Button</Button>
            <Button variant="destructive">Destructive Button</Button>
            <Button variant="link">Link Button</Button>
          </div>
          <div className="flex flex-wrap gap-4 items-center">
            <Button size="sm">Small</Button>
            <Button size="default">Default</Button>
            <Button size="lg">Large</Button>
            <Button disabled>Disabled</Button>
          </div>
        </section>

        {/* Badges */}
        <section className="space-y-6">
          <h2 className="text-2xl font-semibold text-ds-text">Badges</h2>
          <div className="flex flex-wrap gap-4 items-center">
            <Badge>Default (Olive)</Badge>
            <Badge variant="secondary">Secondary</Badge>
            <Badge variant="outline">Outline</Badge>
            <Badge variant="support">Support</Badge>
            <Badge variant="warm">Warm Accent</Badge>
            <Badge variant="destructive">Destructive</Badge>
          </div>
        </section>

        {/* Inputs */}
        <section className="space-y-6">
          <h2 className="text-2xl font-semibold text-ds-text">Inputs</h2>
          <div className="max-w-md space-y-4">
            <Input placeholder="Default input with Wolf Gray border" />
            <Input placeholder="Disabled input" disabled />
          </div>
        </section>

        {/* Cards */}
        <section className="space-y-6">
          <h2 className="text-2xl font-semibold text-ds-text">Cards</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Default Card</CardTitle>
                <CardDescription>White surface with Wolf Gray border</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-ds-text-muted">Card content goes here</p>
              </CardContent>
            </Card>
            <Card variant="elevated">
              <CardHeader>
                <CardTitle>Elevated Card</CardTitle>
                <CardDescription>Warm Parchment background</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-ds-text-muted">Elevated surface content</p>
              </CardContent>
            </Card>
            <Card variant="outline">
              <CardHeader>
                <CardTitle>Outline Card</CardTitle>
                <CardDescription>Strong border emphasis</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-ds-text-muted">Outline variant content</p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Spacing & Radius */}
        <section className="space-y-6">
          <h2 className="text-2xl font-semibold text-ds-text">Border Radius</h2>
          <div className="flex flex-wrap gap-6 items-end">
            <div className="text-center">
              <div className="w-16 h-16 bg-ds-primary rounded-sm" />
              <p className="text-sm text-ds-text-muted mt-2">sm (8px)</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-ds-primary rounded-md" />
              <p className="text-sm text-ds-text-muted mt-2">md (12px)</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-ds-primary rounded-button" />
              <p className="text-sm text-ds-text-muted mt-2">button (13px)</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-ds-primary rounded-card" />
              <p className="text-sm text-ds-text-muted mt-2">card (14px)</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-ds-primary rounded-lg" />
              <p className="text-sm text-ds-text-muted mt-2">lg (16px)</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-ds-primary rounded-pill" />
              <p className="text-sm text-ds-text-muted mt-2">pill (20px)</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-ds-primary rounded-full" />
              <p className="text-sm text-ds-text-muted mt-2">full</p>
            </div>
          </div>
        </section>

        {/* Design System Notes */}
        <section className="space-y-6">
          <h2 className="text-2xl font-semibold text-ds-text">Design System Notes</h2>
          <Card className="bg-ds-bg-subtle">
            <CardContent className="pt-6 space-y-4">
              <div>
                <h4 className="font-semibold text-ds-text">Color Hierarchy</h4>
                <ul className="list-disc list-inside text-ds-text-muted mt-2 space-y-1">
                  <li><strong>PRIMARY (Charcoal #222222)</strong>: Buttons, text, focus states, logos, nav, tabs, badges</li>
                  <li><strong>SURFACE</strong>: White (#FFFFFF) / Warm Parchment (#FAF9F6) - Backgrounds</li>
                  <li><strong>BORDER (Wolf Gray #D9D9D6)</strong>: Borders, dividers</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-ds-text">Wolf Gray Selection</h4>
                <p className="text-ds-text-muted mt-2">
                  Option A (#D9D9D6) selected over Option B (#CFCFCB) for: (1) Warmer undertone harmonizing with Parchment,
                  (2) Better contrast with white surfaces, (3) Softer appearance that doesn't compete with charcoal text.
                </p>
              </div>
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  );
}

function ColorSwatch({
  name,
  color,
  hex,
  textLight = false,
  role
}: {
  name: string;
  color: string;
  hex: string;
  textLight?: boolean;
  role?: string;
}) {
  return (
    <div className="space-y-2">
      <div className={`h-20 rounded-card ${color} flex items-end p-3`}>
        <span className={textLight ? 'text-white' : 'text-ds-text'}>
          {hex}
        </span>
      </div>
      <div>
        <p className="font-medium text-ds-text">{name}</p>
        {role && <p className="text-sm text-ds-text-muted">{role}</p>}
      </div>
    </div>
  );
}
