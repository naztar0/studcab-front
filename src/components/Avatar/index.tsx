import React from 'react';
import { colorChar, utfChar } from '@/helpers/utils';
import defaultAvatar from '@/assets/images/default_avatar.jpg';

export default function Avatar({
  avatar, size, username, rounded, units, align,
}: TAvatar) {
  let style = {};
  if (size) {
    style = {
      ...style, height: `${size}${units}`, width: `${size}${units}`, alignSelf: align,
    };
  }
  if (rounded) {
    style = { ...style, borderRadius: '999px' };
  }
  if (avatar) {
    return <img src={`${process.env.REACT_APP_API_URL}/storage/images/${avatar}`} alt="avatar" style={style} />;
  }
  if (username) {
    return (
      <div style={{
        ...style, textAlign: 'center', backgroundColor: colorChar(username),
      }}
      >
        <span
          style={{ fontSize: `${(size * 2) / 3}${units}`, lineHeight: `${size * 0.9}${units}`, userSelect: 'none' }}
          className="avatar-username"
        >
          {utfChar(username)}
        </span>
      </div>
    );
  }
  return <img src={defaultAvatar} alt="avatar" style={style} />;
}

type TAvatar = {
  avatar?: string | null,
  size: number,
  username?: string | null,
  rounded?: boolean,
  units?: string,
  align?: string
};

Avatar.defaultProps = {
  avatar: null,
  username: null,
  rounded: true,
  units: 'px',
  align: 'center',
};
