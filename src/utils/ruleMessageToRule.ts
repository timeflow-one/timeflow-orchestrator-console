export function ruleMessageToResult (rule: () => boolean | string) {
  const result = rule()
  return typeof result === 'boolean' ? result : false
}

export function ruleMessageToRule (rule: () => boolean | string) {
  const result = rule()
  return () => typeof result === 'boolean' ? result : false
}
