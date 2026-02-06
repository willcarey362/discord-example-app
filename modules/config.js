/**
 * Bot configuration and state
 */

/** @type {string | null} The user ID the bot is currently following */
export let targetUserId = null;

/**
 * Set the target user ID to follow
 * @param {string | null} userId - Discord user ID
 */
export function setTargetUser(userId) {
  targetUserId = userId;
}

/**
 * Get the target user ID
 * @returns {string | null}
 */
export function getTargetUser() {
  return targetUserId;
}
