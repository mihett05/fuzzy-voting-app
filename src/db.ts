import { ref, set, update, remove } from 'firebase/database';
import { v4 as uuid4 } from 'uuid';

import { auth, db } from './firebase';

export type Poll = {
  name: string;
  timestamp: number;
  variants?: Record<string, Variant>;
  votes?: Record<string, Vote>;
};

export type Variant = {
  content: string;
  timestamp: number;
};

export type Vote = {
  variant: string;
};

export type Polls = Record<string, Poll>;

interface EditPoll {
  name?: string;
  multiChoice?: boolean;
}

export const createPoll = async (): Promise<string | null> => {
  if (auth.currentUser) {
    const uuid = uuid4();
    const pollRef = ref(db, `polls/${auth.currentUser.uid}/${uuid}`);
    await set(pollRef, {
      name: `Poll ${uuid}`,
      timestamp: new Date().getTime(),
    } as Poll);

    return uuid;
  }

  return null;
};

export const editPoll = async (pollUuid: string, edit: EditPoll) => {
  if (auth.currentUser) {
    if (Object.keys(edit).length !== 0) {
      // check if any changes will be applied
      const pollRef = ref(db, `polls/${auth.currentUser.uid}/${pollUuid}`);
      await update(pollRef, edit);
    }
  }
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
      timestamp: new Date().getTime(),
    } as Variant);

    return variantUid;
  }

  return null;
};

export const editPollVariant = async (pollUuid: string, variantUuid: string, variant: string) => {
  if (auth.currentUser) {
    const pollVariantRef = ref(db, `polls/${auth.currentUser.uid}/${pollUuid}/variants/${variantUuid}`);
    await update(pollVariantRef, {
      content: variant,
    } as Variant);
  }
};

export const removePollVariant = async (pollUuid: string, variantUuid: string) => {
  if (auth.currentUser) {
    const pollVariantRef = ref(db, `polls/${auth.currentUser.uid}/${pollUuid}/variants/${variantUuid}`);
    await remove(pollVariantRef);
  }
};

export const voteInPoll = async (ownerUid: string, pollUuid: string, variantUuid: string): Promise<boolean> => {
  if (auth.currentUser) {
    const pollVotesRef = ref(db, `polls/${ownerUid}/${pollUuid}/votes/${auth.currentUser.uid}`);
    try {
      await set(pollVotesRef, {
        variant: variantUuid,
      });
      return true;
    } catch (e) {}
  }

  return false;
};

export const sortByTimestamp = (uuids: Record<string, { timestamp: number }>) =>
  Object.keys(uuids).sort((a: string, b: string) => {
    const tsA = uuids[a].timestamp;
    const tsB = uuids[b].timestamp;

    if (tsA < tsB) return -1;
    else if (tsA === tsB) return 0;
    else return 1;
  });
