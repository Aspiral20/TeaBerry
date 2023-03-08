export type FeatureType = {
  id: string,
  value: any,
  status?: string
}

export type SelectFeaturesContextType = {
  current: FeatureType
  data: Array<FeatureType>
}