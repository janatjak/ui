import { TagProps } from '.';
import { defaultsTheme } from '../../utils/defaults';

export type TagType = 'solid' | 'outline' | 'clear';

interface TagValue {
  default: TagProps;
  types: Record<TagType, TagProps>;
}

export interface TagTheme {
  tag: TagValue;
}

export const tag = (t: {
  default?: TagProps;
  types?: Partial<Record<TagType, TagProps>>;
} = emptyTag): TagTheme => ({ tag: defaultsTheme<'types', TagProps>(t, emptyTag) });

const emptyTag: TagValue = {
  default: {
    borderRadius: '0.3rem',
    border: '1px solid #455663',
    px: '0.7rem',
    fontFamily: 'text',
    fontSize: '1.2rem',
    fontWeight: 500,
    lineHeight: '2rem'
  },
  types: {
    solid: {
      bg: '#455663',
      color: 'background'
    },
    outline: {
      color: '#0f1f28'
    },
    clear: {
      borderColor: 'transparent'
    }
  }
};
