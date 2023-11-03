import { ExpoModuleConfig } from './ExpoModuleConfig';

export type SupportedPlatform = 'ios' | 'android' | 'web' | 'devtools';

export interface SearchOptions {
  // Available in the CLI
  searchPaths: string[];
  ignorePaths?: string[] | null;
  exclude?: string[] | null;
  platform: SupportedPlatform;
  silent?: boolean;
  nativeModulesDir?: string | null;
  projectRoot: string;
  /**
   * Filter the search results to only include the project dependencies.
   * In a monorepo, you may like to set this to false and link all modules from the monorepo.
   * @default true
   */
  onlyProjectDeps?: boolean;

  // Scratched from project's config
  flags?: Record<string, any>;
}

export interface ResolveOptions extends SearchOptions {
  json?: boolean;
}

export interface GenerateOptions extends ResolveOptions {
  target: string;
  namespace?: string;
  empty?: boolean;
}

export interface PatchReactImportsOptions {
  podsRoot: string;
  dryRun: boolean;
}

export type PackageRevision = {
  path: string;
  version: string;
  config?: ExpoModuleConfig;
  duplicates?: PackageRevision[];
};

export type SearchResults = {
  [moduleName: string]: PackageRevision;
};

export interface ModuleAndroidProjectInfo {
  name: string;
  sourceDir: string;
}

export interface ModuleAndroidPluginInfo {
  id: string;
  sourceDir: string;
}

export interface ModuleDescriptorAndroid {
  packageName: string;
  projects: ModuleAndroidProjectInfo[];
  plugins?: ModuleAndroidPluginInfo[];
  modules: string[];
}

export interface ModuleIosPodspecInfo {
  podName: string;
  podspecDir: string;
}
export interface ModuleDescriptorIos {
  packageName: string;
  pods: ModuleIosPodspecInfo[];
  flags: Record<string, any> | undefined;
  swiftModuleNames: string[];
  modules: string[];
  appDelegateSubscribers: string[];
  reactDelegateHandlers: string[];
  debugOnly: boolean;
  includeTestSpecsLocally: boolean;
}

export interface ModuleDescriptorDevTools {
  packageName: string;
  packageRoot: string;
  webpageRoot: string;
}

export type ModuleDescriptor =
  | ModuleDescriptorAndroid
  | ModuleDescriptorIos
  | ModuleDescriptorDevTools;

export interface AndroidGradlePluginDescriptor {
  /**
   * Gradle plugin ID
   */
  id: string;

  /**
   * Artifact group
   */
  group: string;

  /**
   * Relative path to the gradle plugin directory
   */
  sourceDir: string;
}

/**
 * Represents a raw config from `expo-module.json`.
 */
export interface RawExpoModuleConfig {
  /**
   * An array of supported platforms.
   */
  platforms?: SupportedPlatform[];

  /**
   * iOS-specific config.
   */
  ios?: {
    /**
     * Names of Swift native modules classes to put to the generated modules provider file.
     */
    modules?: string[];

    /**
     * Names of Swift native modules classes to put to the generated modules provider file.
     * @deprecated Deprecated in favor of `modules`. Might be removed in the future releases.
     */
    modulesClassNames?: string[];

    /**
     * Names of Swift classes that hooks into `ExpoAppDelegate` to receive AppDelegate life-cycle events.
     */
    appDelegateSubscribers?: string[];

    /**
     * Names of Swift classes that implement `ExpoReactDelegateHandler` to hook React instance creation.
     */
    reactDelegateHandlers?: string[];

    /**
     * Podspec relative path.
     * To have multiple podspecs, string array type is also supported.
     */
    podspecPath?: string | string[];

    /**
     * Swift product module name. If empty, the pod name is used for Swift imports.
     * To have multiple modules, string array is also supported.
     */
    swiftModuleName?: string | string[];

    /**
     * Whether this module will be added only to the debug configuration.
     * Defaults to false.
     */
    debugOnly?: boolean;

    /**
     * Whether the podspec test_specs should included when this project is local.
     * Local is defined as 'outside of node_modules', so this option
     * has no effect on modules included via package.json, but will affect
     * modules in custom search directories. (e.g. local modules in ./modules/)
     *
     * Defaults to false.
     */
    includeTestSpecsLocally?: boolean;
  };

  /**
   * Android-specific config.
   */
  android?: {
    /**
     * Full names (package + class name) of Kotlin native modules classes to put to the generated package provider file.
     */
    modules?: string[];

    /**
     * Full names (package + class name) of Kotlin native modules classes to put to the generated package provider file.
     * @deprecated Deprecated in favor of `modules`. Might be removed in the future releases.
     */
    modulesClassNames?: string[];

    /**
     * build.gradle relative path.
     * To have multiple build.gradle projects, string array type is also supported.
     */
    gradlePath?: string | string[];

    /**
     * Gradle plugins.
     */
    gradlePlugins?: AndroidGradlePluginDescriptor[];
  };

  /**
   * DevTools-specific config.
   */
  devtools?: {
    /**
     * The webpage root directory for Expo CLI DevTools to serve the web resources.
     */
    webpageRoot: string;
  };
}
