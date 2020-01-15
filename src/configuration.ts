export enum RuleKeys {
    InvalidButtonSize = 'WARNING.INVALID_BUTTON_SIZE',
    InvalidButtonPosition = 'WARNING.INVALID_BUTTON_POSITION',
    InvalidPlaceHolderSize = 'WARNING.INVALID_PLACEHOLDER_SIZE',
    TextShouldBeEqual = 'WARNING.TEXT_SIZES_SHOULD_BE_EQUAL',
    TextSeveralH1 = 'TEXT.SEVERAL_H1',
    InvalidH2Position = 'TEXT.INVALID_H2_POSITION',
    InvalidH3Position = 'TEXT.INVALID_H3_POSITION',
    ToMuchMarketingBlocks = 'GRID.TOO_MUCH_MARKETING_BLOCKS'
}

export enum Severity {
    Error = "Error", 
    Warning = "Warning", 
    Information = "Information", 
    Hint = "Hint", 
    None = "None"
}

export interface SeverityConfiguration {
    [RuleKeys.InvalidButtonSize]: Severity;
    [RuleKeys.InvalidButtonPosition]: Severity;
    [RuleKeys.InvalidPlaceHolderSize]: Severity;
    [RuleKeys.TextShouldBeEqual]: Severity;
    [RuleKeys.TextSeveralH1]: Severity;
    [RuleKeys.InvalidH2Position]: Severity;
    [RuleKeys.InvalidH3Position]: Severity;
    [RuleKeys.ToMuchMarketingBlocks]: Severity;
}

export interface ExampleConfiguration {
 
    enable: boolean;
 
    severity: SeverityConfiguration;
}
