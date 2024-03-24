/**
 * name: stripHtmlTags
 * description: This function is used to remove html tags from a string.
 * @param htmlString
 * @returns string
 */
export const stripHtmlTags = (htmlString: string) => {
  return htmlString.replace(/<[^>]*>/g, "");
};

/**
 * name: removeH1Tags
 * description: This function is used to remove h1 tags from a string.
 * @param content
 * @returns string
 */

export const removeH1Tags = (content: string) => {
  if (content) {
    return content.replace(/<h1[^>]*>[\s\S]*?<\/h1>/g, "");
  }
  return "";
};

/**
 * name: removeHtmlTags
 * description: This function is used to remove html tags from a string.
 * @param content
 * @returns string
 */
export const removeHtmlTags = (content: string) => {
  if (content) {
    return stripHtmlTags(removeH1Tags(content));
  }
  return "";
};

/**
 * name: getDescription
 * description: This function is used to get the description from a string.
 * @param textWithoutHtml
 * @returns string
 */
export const getDescription = (textWithoutHtml: string) => {
  return textWithoutHtml.split(/\s+/).slice(0, 20).join(" ");
};

/**
 * name: getTitle
 * description: This function is used to get the title from a string.
 * @param content
 * @returns string
 */

export const getTitle = (content: string) => {
  if (content) {
    const h1match = content.match(/<h1[^>]*>([\s\S]*?)<\/h1>/);
    const match = h1match ? h1match[1] : "";
    return stripHtmlTags(match);
  }
  return "";
};

/**
 * name: getImage
 * description: This function is used to get the image from a string.
 * @param content
 * @returns string
 */

export const getImage = (content: string) => {
  if (content) {
    const imgMatch = content.match(/<img[^>]*src=["']([^"']*)["'][^>]*>/);
    const match = imgMatch ? imgMatch[1] : "";
    const imageUrl = getImageUrl(match);

    return imageUrl;
  }
  return "";
};

export const getImageUrl = (match: string) => {
  const encodedUrlMatch = match.match(/url=([^&]+)/);
  const encodedUrl = encodedUrlMatch ? encodedUrlMatch[1] : null;
  if (encodedUrl) {
    const decodedUrl = decodeURIComponent(encodedUrl.replace(/&amp;/g, "&"));

    return decodedUrl;
  } else {
    console.log("No URL found in the src attribute");
  }
};

/**
 * name: getTitleDescriptionImage
 * description: This function is used to get the title, description and image from a string.
 * @param content
 * @returns object
 */
export const getTitleDescriptionImage = (content: string) => {
  const title = getTitle(content);
  const description = getDescription(removeHtmlTags(content));
  const image = getImage(content);
  return { title, description, image };
};

/**
 * name: sanitizeContent
 * description: This function is used to sanitize the content by removing the first H1 match, select tags, and textarea tags.
 * @param content - The content to sanitize.
 * @returns string - The sanitized content.
 */
export const sanitizeContent = (content: string) => {
  if (content) {
    const sanitizedContent = content.replace(
      /<h1[^>]*>[\s\S]*?<\/h1>|<select[^>]*>[\s\S]*?<\/select>|<textarea[^>]*>[\s\S]*?<\/textarea>/gi,
      ""
    );
    return sanitizedContent;
  }
  return "";
};

/**
 * name: calculateDaysAgo
 * description: This function calculates the number of days ago a given date is from the current date.
 * @param createdAt - The date to calculate the days ago from.
 * @returns number - The number of days ago.
 */
export const calculateDaysAgo = (createdAt: Date) => {
  const currentDate = new Date();
  const createdDate = new Date(createdAt);
  const timeDifference: number = currentDate.getTime() - createdDate.getTime();

  const daysAgo = Math.floor(timeDifference / (1000 * 60 * 60 * 24));

  return daysAgo;
};

/**
 * name: calculateReadTime
 * description: This function calculates the estimated read time for a given content.
 * @param content - The content to calculate the read time for.
 * @returns number - The estimated read time in minutes.
 */
export const calculateReadTime = (content: string) => {
  // Assuming an average reading speed of 200 words per minute
  const wordsPerMinute = 200;

  // Count the number of words in the content
  const wordCount = content.split(/\s+/).length;

  // Calculate the estimated read time
  const readTime = Math.ceil(wordCount / wordsPerMinute);

  return readTime;
};
