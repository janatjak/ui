import React, { FC } from 'react';
import Text, { TextProps } from '.';

type TextAliasProps = Omit<TextProps, 't' | 'type'>;

export const Span: FC<TextAliasProps> = (p) =>
  <Text t="span" {...p} />;

export const Em: FC<TextAliasProps> = (p) =>
  <Text t="em" {...p} />;

export const Strong: FC<TextAliasProps> = (p) =>
  <Text t="strong" {...p} />;

export const Underline: FC<TextAliasProps> = (p) =>
  <Text t="underline" {...p} />;

export const Abbr: FC<TextAliasProps> = (p) =>
  <Text t="abbr" {...p} />;

export const Strikethrough: FC<TextAliasProps> = (p) =>
  <Text t="strikethrough" {...p} />;

export const Sub: FC<TextAliasProps> = (p) =>
  <Text t="sub" {...p} />;

export const Sup: FC<TextAliasProps> = (p) =>
  <Text t="sup" {...p} />;
