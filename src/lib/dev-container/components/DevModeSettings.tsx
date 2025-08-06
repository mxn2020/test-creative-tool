// src/lib/dev-container/components/DevModeSettings.tsx

import React from 'react';
import { Switch } from '../../../components/ui/switch';
import { Label } from '../../../components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '../../../components/ui/card';
import { Separator } from '../../../components/ui/separator';
import { Settings, Palette } from 'lucide-react';
import { useDevMode } from './DevModeProvider';
import { DevModeConfig } from '../types';

const colorOptions = [
  { name: 'Blue', value: '#3b82f6' },
  { name: 'Green', value: '#10b981' },
  { name: 'Purple', value: '#8b5cf6' },
  { name: 'Pink', value: '#ec4899' },
  { name: 'Orange', value: '#f59e0b' },
  { name: 'Red', value: '#ef4444' },
  { name: 'Teal', value: '#14b8a6' },
  { name: 'Indigo', value: '#6366f1' },
];

export const DevModeSettings: React.FC = () => {
  const { config, setConfig } = useDevMode();

  const handleConfigChange = (key: keyof DevModeConfig, value: any) => {
    const newConfig = { ...config, [key]: value };
    setConfig(newConfig);
    
    // Save to localStorage
    localStorage.setItem('dev-mode-config', JSON.stringify(newConfig));
  };

  const ColorPicker: React.FC<{ 
    label: string; 
    value: string; 
    onChange: (color: string) => void 
  }> = ({ label, value, onChange }) => (
    <div className="space-y-2">
      <Label className="text-sm font-medium">{label}</Label>
      <div className="flex flex-wrap gap-2">
        {colorOptions.map((color) => (
          <button
            key={color.value}
            type="button"
            className={`w-8 h-8 rounded-full border-2 transition-all hover:scale-110 ${
              value === color.value 
                ? 'border-gray-900 scale-110' 
                : 'border-gray-300 hover:border-gray-500'
            }`}
            style={{ backgroundColor: color.value }}
            onClick={() => onChange(color.value)}
            title={color.name}
          />
        ))}
      </div>
      <div className="flex items-center gap-2 mt-2">
        <div 
          className="w-4 h-4 rounded border" 
          style={{ backgroundColor: value }}
        />
        <span className="text-xs text-muted-foreground">{value}</span>
      </div>
    </div>
  );

  return (
    <>
      {/* Settings icon centered in the button */}
      <div className="flex items-center justify-center w-full h-full">
        <Settings className="h-6 w-6" />
      </div>
      
      {/* Settings popover positioned to the right and higher */}
      <div className="absolute left-full ml-4 bottom-0 z-10">
        <Card className="w-80 shadow-xl border">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm flex items-center gap-2">
              <Palette className="h-4 w-4" />
              Dev Mode Settings
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Dashed Borders Toggle */}
            <div className="flex items-center justify-between">
              <Label htmlFor="dashed-borders" className="text-sm font-medium">
                Show Dashed Borders
              </Label>
              <Switch
                id="dashed-borders"
                checked={config.showDashedBorders}
                onCheckedChange={(checked) => 
                  handleConfigChange('showDashedBorders', checked)
                }
              />
            </div>

            <Separator />

            {/* Hover Color */}
            <ColorPicker
              label="Hover Color"
              value={config.hoverColor}
              onChange={(color) => handleConfigChange('hoverColor', color)}
            />

            <Separator />

            {/* Selected Color */}
            <ColorPicker
              label="Selected Color"
              value={config.selectedColor}
              onChange={(color) => handleConfigChange('selectedColor', color)}
            />

            <Separator />

            {/* Additional Settings */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Label htmlFor="show-component-ids" className="text-sm font-medium">
                  Show Component IDs
                </Label>
                <Switch
                  id="show-component-ids"
                  checked={config.showComponentIds}
                  onCheckedChange={(checked) => 
                    handleConfigChange('showComponentIds', checked)
                  }
                />
              </div>

              <div className="flex items-center justify-between">
                <Label htmlFor="show-tooltips" className="text-sm font-medium">
                  Show Tooltips
                </Label>
                <Switch
                  id="show-tooltips"
                  checked={config.showTooltips}
                  onCheckedChange={(checked) => 
                    handleConfigChange('showTooltips', checked)
                  }
                />
              </div>

              <div className="flex items-center justify-between">
                <Label htmlFor="auto-sidebar" className="text-sm font-medium">
                  Auto Open Sidebar
                </Label>
                <Switch
                  id="auto-sidebar"
                  checked={config.autoOpenSidebar}
                  onCheckedChange={(checked) => 
                    handleConfigChange('autoOpenSidebar', checked)
                  }
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label htmlFor="detailed-containerization" className="text-sm font-medium">
                    Detailed Containerization
                  </Label>
                  <p className="text-xs text-muted-foreground">
                    Enable dev containers for sub-components like CardHeader, H1, etc.
                  </p>
                </div>
                <Switch
                  id="detailed-containerization"
                  checked={config.detailedContainerization}
                  onCheckedChange={(checked) => 
                    handleConfigChange('detailedContainerization', checked)
                  }
                />
              </div>
            </div>

            <div className="pt-2">
              <p className="text-xs text-muted-foreground">
                Settings are automatically saved to localStorage
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default DevModeSettings;