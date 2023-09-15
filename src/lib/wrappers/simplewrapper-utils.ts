import { PluginConfig } from 'molstar/lib/mol-plugin/config.js';
import type { PluginSpec } from 'molstar/lib/mol-plugin/spec.js';
import { Color } from 'molstar/lib/mol-util/color/color.js';

export const defaultPluginSpec: Partial<PluginSpec> = {
	config: [[PluginConfig.VolumeStreaming.Enabled, false]],
	canvas3d: {
		postprocessing: {
			occlusion: {
				name: 'on',
				params: {
					samples: 32,
					radius: 6,
					bias: 1.4,
					multiScale: { name: 'off', params: {} },
					blurKernelSize: 15,
					resolutionScale: 1
				}
			},
			outline: { name: 'on', params: { scale: 1, threshold: 0.99, color: Color(0x000000) } }
		},
		renderer: {
			ambientIntensity: 1.0,
			light: [
				//{ color: Color(0xffffff), azimuth: 1.0, inclination: 180, intensity: 1.0 }
			],
			backgroundColor: 0x001f42 as Color
		}
	}
	//config:[[PluginConfig.Structure.DefaultRepresentationPreset, ViewerAutoPreset.id],]
};

export const defaultCanvas3dSettings = {
	settings: {
		/* renderer: {
      ...renderer,
      ambientIntensity: 1.0,
      light: [],
      backgroundColor: 0x001f42 as Color
    }, */
		cameraResetDurationMs: 100,
		trackball: {
			noScroll: true
		},
		postprocessing: {
			occlusion: {
				name: 'on',
				params: {
					multiScale: { name: 'off', params: {} },
					samples: 32,
					radius: 6,
					bias: 1.4,
					blurKernelSize: 15,
					resolutionScale: 1
				}
			},
			outline: { name: 'on', params: { scale: 1, threshold: 0.33, color: Color(0x000000) } }
		}
	}
};
