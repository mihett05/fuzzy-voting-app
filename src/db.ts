import { ref, set, update, remove } from 'firebase/database';
import { v4 as uuid4 } from 'uuid';

import { auth, db } from './firebase';

export type Poll = {
  name: string;
  timestamp: number;
  variants?: Record<string, Variant>;
};

export type Variant = {
  content: string;
};

export type Polls = Record<string, Poll>;

export const createPoll = async (): Promise<string | null> => {
  if (auth.currentUser) {
    const uuid = uuid4();
    const pollRef = ref(db, `polls/${auth.currentUser.uid}/${uuid}`);
    await set(pollRef, {
      name: `Poll ${uuid}`,
      timestamp: new Date().getTime(),
      variants: {},
    });

    return uuid;
  }

  return null;
};

export const removePoll = async (pollUuid: string) => {
  if (auth.currentUser) {
    const pollRef = ref(db, `polls/${auth.currentUser.uid}/${pollUuid}`);
    await remove(pollRef);
  }
};

export const addPollVariant = async (pollUuid: string): Promise<string | null> => {
  if (auth.currentUser) {
    const variantUid = uuid4();
    const pollVariantRef = ref(db, `polls/${auth.currentUser.uid}/${pollUuid}/variants/${variantUid}`);
    await set(pollVariantRef, {
      content: `Variant ${variantUid}`,
    });

    return variantUid;
  }

  return null;
};

export const editPollVariant = async (pollUuid: string, variantUuid: string, variant: string) => {
  if (auth.currentUser) {
    const pollVariantRef = ref(db, `polls/${auth.currentUser.uid}/${pollUuid}/variants/${variantUuid}`);
    await update(pollVariantRef, {
      content: variant,
    });
  }
};

export const removePollVariant = async (pollUuid: string, variantUuid: string) => {
  if (auth.currentUser) {
    const pollVariantRef = ref(db, `polls/${auth.currentUser.uid}/${pollUuid}/variants/${variantUuid}`);
    await remove(pollVariantRef);
  }
};
