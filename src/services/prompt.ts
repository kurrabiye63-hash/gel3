// ================================================
// FRONT VIEW PROMPT — Original Editorial Front Shot
// ================================================
export const FRONT_VIEW_PROMPT = `
[START TECHNICAL PROMPT BLOCK]
------------------------------------------------
NANO BANANA PRO – ULTRA BRIDAL GARMENT LOCK PROMPT

INPUT REFERENCES

Image 1:
Wedding dress on mannequin (MASTER GARMENT REFERENCE)

Image 2:
Female model reference (MODEL IDENTITY REFERENCE)

------------------------------------------------
MASTER RULE
------------------------------------------------

Treat the wedding dress as a locked couture product.

The AI must behave like a professional fashion photographer transferring a garment from a mannequin to a real model.

This is NOT a generative redesign task.

The gown must remain visually identical to the original reference.

------------------------------------------------
GARMENT TRANSFER TASK
------------------------------------------------

Remove the mannequin completely.

Place the exact same bridal gown from Image 1 onto the woman from Image 2.

The garment must remain unchanged.

The dress must appear naturally worn by the model.

------------------------------------------------
GARMENT IDENTITY LOCK
------------------------------------------------

Preserve all garment design elements exactly:

• lace patterns
• beadwork placement
• embroidery details
• sleeve lace transparency
• sleeve construction
• neckline shape
• corset structure
• seam lines
• waist structure
• skirt panel construction
• hemline shape
• train structure
• appliqué placements
• stitching details

Do NOT redesign the gown.

------------------------------------------------
GARMENT GEOMETRY LOCK
------------------------------------------------

Maintain the original silhouette.

• corset lines must remain straight
• lace must not move or shift
• sleeves must keep original structure
• skirt panels must remain identical
• hemline must remain unchanged
• train must keep the same length and shape

No garment distortion allowed.

------------------------------------------------
COUTURE DETAIL PRESERVATION
------------------------------------------------

Preserve couture micro details:

• lace thread texture
• embroidery density
• bead reflections
• satin or silk highlights
• fabric thickness
• seam stitching visibility

Do not smooth or simplify textures.

------------------------------------------------
COUTURE FABRIC PHYSICS
------------------------------------------------

Simulate realistic bridal couture fabric behavior.

• gravity affecting skirt weight
• natural corset tension
• realistic waist compression
• natural draping across hips
• layered skirt weight distribution
• soft folds where fabric gathers
• train spreading naturally on the floor

The dress must behave like real fabric.

------------------------------------------------
MODEL IDENTITY LOCK
------------------------------------------------

Use the woman from Image 2.

Face must remain identical.

Preserve:

• facial structure
• skin tone
• eye shape
• lips
• nose
• facial proportions

Do not alter facial identity.

------------------------------------------------
HAIR GEOMETRY LOCK — CRITICAL
------------------------------------------------

Hair must remain EXACTLY identical to the reference model image.

Preserve all hair characteristics:

• copper red hair color
• medium length hair
• loose natural hairstyle
• soft wavy texture
• side parted hair
• natural hair volume
• hair falling naturally around the face and shoulders

Hair must remain OPEN and NATURAL.

Do NOT create or simulate any bridal hairstyle.

STRICTLY FORBIDDEN:

• bun
• ballerina bun
• bridal bun
• ponytail
• updo
• braided hairstyle

Hair silhouette, length, and direction must remain identical to the reference.

Hair must stay loose and down exactly like the reference.

------------------------------------------------
POSE – CONTROLLED MODERN POSE VARIATION
------------------------------------------------

Allow subtle variation in pose for each generation.

The model should create elegant modern bridal fashion poses.

Pose characteristics:

• natural relaxed standing pose
• slightly shifted body weight
• subtle hip angle
• soft shoulder positioning
• elegant hand placement

Examples of allowed variation:

• one arm relaxed beside the body
• one hand gently touching the dress
• hands softly placed near waist
• slight torso angle
• very subtle head tilt

The poses must remain:

• calm
• elegant
• natural
• modern fashion style

Avoid aggressive or dramatic poses.

------------------------------------------------
BACKGROUND
------------------------------------------------

Seamless infinity studio background.

Neutral tone matching the reference model background.

Clean minimalist studio environment.

------------------------------------------------
LIGHTING
------------------------------------------------

Professional fashion studio lighting.

Soft diffused key light
Subtle fill light
Low contrast editorial lighting

------------------------------------------------
CAMERA
------------------------------------------------

Full body framing
85mm fashion photography lens look
high resolution fashion image

------------------------------------------------
QUALITY TARGET
------------------------------------------------

Ultra photorealistic
hyper detailed couture fabric
luxury bridal editorial photography
natural skin texture

------------------------------------------------
NEGATIVE
------------------------------------------------

No dress redesign
No lace distortion
No seam warping
No missing embroidery
No hairstyle change
No crown
No necklace
No accessories
No text
No watermark
No anatomy errors  Each generation may produce a slightly different elegant editorial pose.
------------------------------------------------
[END TECHNICAL PROMPT BLOCK]
`;

// Keep backward compat alias
export const BRIDAL_GARMENT_LOCK_PROMPT = FRONT_VIEW_PROMPT;


// ================================================
// BACK VIEW PROMPT — Locked Back Camera Angle
// ================================================
export const BACK_VIEW_PROMPT = `
[START TECHNICAL PROMPT BLOCK]
------------------------------------------------
NANO BANANA PRO – ULTRA BRIDAL GARMENT LOCK PROMPT
BACK VIEW — CRITICAL LOCKED CAMERA ANGLE

INPUT REFERENCES

Image 1:
Wedding dress on mannequin (MASTER GARMENT REFERENCE)

Image 2:
Female model reference (MODEL IDENTITY REFERENCE)

------------------------------------------------
MASTER RULE
------------------------------------------------

Treat the wedding dress as a locked couture product.

The AI must behave like a professional fashion photographer shooting a BACK VIEW of the garment on a real model.

This is NOT a generative redesign task.

The gown must remain visually identical to the original reference.

------------------------------------------------
VIEW LOCK — BACK VIEW (CRITICAL)
------------------------------------------------

The model must be shown from the BACK.

Camera position is behind the model.

The viewer must see the back of the gown.

The face must NOT be visible.

Visible areas:

• back of the dress
• corset back
• lace back details
• back waist line
• back skirt structure
• train

Camera angle:

straight back view
centered symmetrical composition

STRICTLY FORBIDDEN:

• front view
• side view
• 3/4 view
• angled pose
• turning body toward camera

The model must face away from the camera.

The back of the dress must be the primary focus.

STRICT BACK VIEW
MODEL FACING AWAY FROM CAMERA
CENTERED SYMMETRICAL BACK COMPOSITION

------------------------------------------------
GARMENT TRANSFER TASK
------------------------------------------------

Remove the mannequin completely.

Place the exact same bridal gown from Image 1 onto the woman from Image 2.

The garment must remain unchanged.

The dress must appear naturally worn by the model.

Show the BACK of the dress on the model.

------------------------------------------------
GARMENT IDENTITY LOCK
------------------------------------------------

Preserve all garment design elements exactly:

• back lace patterns
• back beadwork placement
• back embroidery details
• corset back lacing or buttons
• back neckline shape
• back corset structure
• back seam lines
• back waist structure
• back skirt panel construction
• train structure and length
• back appliqué placements
• back stitching details

Do NOT redesign the gown.

------------------------------------------------
GARMENT GEOMETRY LOCK
------------------------------------------------

Maintain the original silhouette from the back.

• corset back lines must remain straight
• back lace must not move or shift
• back structure must keep original form
• skirt panels from back must remain identical
• train must keep the same length and shape
• back closure details (buttons, lacing) must be preserved

No garment distortion allowed.

------------------------------------------------
COUTURE DETAIL PRESERVATION
------------------------------------------------

Preserve couture micro details:

• lace thread texture
• embroidery density
• bead reflections
• satin or silk highlights
• fabric thickness
• seam stitching visibility
• back closure detail (buttons, hooks, lacing)

Do not smooth or simplify textures.

------------------------------------------------
COUTURE FABRIC PHYSICS
------------------------------------------------

Simulate realistic bridal couture fabric behavior from back view.

• gravity affecting skirt weight from behind
• natural corset tension on the back
• realistic waist compression from back angle
• natural draping across hips seen from behind
• layered skirt weight distribution
• soft folds where fabric gathers at the back
• train spreading naturally on the floor behind the model

The dress must behave like real fabric.

------------------------------------------------
MODEL IDENTITY LOCK
------------------------------------------------

Use the woman from Image 2.

Since the model faces AWAY from camera, the face is NOT visible.

Preserve:

• body proportions
• skin tone
• hair from behind

------------------------------------------------
HAIR GEOMETRY LOCK — BACK VIEW
------------------------------------------------

Hair must remain EXACTLY identical to the reference model image.

Show hair from behind:

• natural hair falling down the back
• hair color preserved
• hair length preserved
• loose natural hairstyle visible from behind

Hair must remain OPEN and NATURAL.

Do NOT create or simulate any bridal hairstyle.

STRICTLY FORBIDDEN:
• bun
• updo
• braided hairstyle
• any hairstyle modification

------------------------------------------------
POSE — BACK VIEW SPECIFIC
------------------------------------------------

The model stands facing away from the camera.

Pose characteristics:

• straight standing pose facing away
• slight natural body weight shift
• arms naturally at sides or gently touching dress
• shoulders relaxed and natural
• head facing forward (away from camera)

The pose must be:

• calm
• elegant
• symmetrical
• focused on showcasing the back of the dress

STRICTLY FORBIDDEN:
• looking over shoulder
• turning toward camera
• any rotation that reveals front

------------------------------------------------
BACKGROUND
------------------------------------------------

Seamless infinity studio background.

Neutral tone matching the reference model background.

Clean minimalist studio environment.

------------------------------------------------
LIGHTING
------------------------------------------------

Professional fashion studio lighting.

Soft diffused key light from behind-angle
Subtle rim light to define dress edges
Low contrast editorial lighting

------------------------------------------------
CAMERA
------------------------------------------------

Full body framing from behind
85mm fashion photography lens look
high resolution fashion image
centered symmetrical back composition

------------------------------------------------
QUALITY TARGET
------------------------------------------------

Ultra photorealistic
hyper detailed couture fabric from back
luxury bridal editorial photography
natural skin texture

------------------------------------------------
NEGATIVE
------------------------------------------------

No front view
No side view
No 3/4 angle view
No face visible
No turning toward camera
No dress redesign
No lace distortion
No seam warping
No missing embroidery
No hairstyle change
No crown
No necklace
No accessories
No text
No watermark
No anatomy errors
------------------------------------------------
[END TECHNICAL PROMPT BLOCK]
`;


// ================================================
// CLOSE-UP VIEW PROMPT — Waist-Up Couture Portrait
// ================================================
export const CLOSEUP_VIEW_PROMPT = `
[START TECHNICAL PROMPT BLOCK]
------------------------------------------------
NANO BANANA PRO – ULTRA BRIDAL GARMENT LOCK PROMPT (WAIST-UP)

INPUT REFERENCES

Image 1:
Wedding dress on mannequin (MASTER GARMENT REFERENCE)

Image 2:
Female model reference (MODEL IDENTITY REFERENCE)

Image 3:
Seamless infinity studio background reference

------------------------------------------------
MASTER RULE
------------------------------------------------

Treat the wedding dress as a locked couture product.

The AI must behave like a professional fashion photographer transferring a garment from a mannequin to a real model.

This is NOT a generative redesign task.

The gown must remain visually identical to the original reference.

------------------------------------------------
GARMENT TRANSFER TASK
------------------------------------------------

Remove the mannequin completely.

Place the exact same bridal gown from Image 1 onto the woman from Image 2.

The garment must remain unchanged.

The dress must appear naturally worn by the model.

------------------------------------------------
GARMENT IDENTITY LOCK
------------------------------------------------

Preserve all garment design elements exactly:

• lace patterns
• beadwork placement
• embroidery details
• sleeve lace transparency
• sleeve construction
• neckline shape
• corset structure
• seam lines
• waist structure
• appliqué placements
• stitching details

Do NOT redesign the gown.

------------------------------------------------
GARMENT GEOMETRY LOCK
------------------------------------------------

Maintain the original bodice silhouette.

• corset lines must remain straight
• lace must not move or shift
• sleeve lace must remain identical
• neckline geometry must remain unchanged
• waist seam structure must remain identical

No garment distortion allowed.

------------------------------------------------
COUTURE DETAIL PRESERVATION
------------------------------------------------

Preserve couture micro details with maximum clarity:

• lace thread texture
• embroidery density
• bead reflections
• fabric micro folds
• satin or silk highlights
• seam stitching visibility

The bodice, sleeves and neckline must display maximum couture detail.

------------------------------------------------
COUTURE FABRIC PHYSICS
------------------------------------------------

Simulate realistic couture fabric tension.

• natural corset tension across the torso
• realistic waist shaping
• natural fabric tension across bust and shoulders
• subtle fabric folds around arms and torso

Fabric must behave like real couture material.

------------------------------------------------
MODEL IDENTITY LOCK
------------------------------------------------

Use the woman from Image 2.

Face must remain identical.

Preserve:

• facial structure
• skin tone
• eye shape
• lips
• nose
• facial proportions

Do not alter facial identity.

------------------------------------------------
HAIR GEOMETRY LOCK — CRITICAL
------------------------------------------------

Hair must remain EXACTLY identical to the reference model image.

Preserve:

• copper red hair color
• medium length hair
• loose natural hairstyle
• soft wavy texture
• side parted hair
• natural volume
• hair falling naturally around the face and shoulders

Hair must remain open.

STRICTLY FORBIDDEN:

• bun
• bridal bun
• ponytail
• updo
• braided hairstyle

------------------------------------------------
POSE – CONTROLLED MODERN POSE VARIATION
------------------------------------------------

Allow subtle elegant pose variation.

Examples:

• relaxed shoulders
• slight torso angle
• subtle head tilt
• gentle hand placement near waist or bodice

Poses must remain calm and elegant.

------------------------------------------------
POSE LIBRARY PROMPT
------------------------------------------------

For each generation select a pose from a bridal editorial pose library.

Examples:

• slight shoulder rotation
• soft head tilt
• elegant hand resting near waist
• subtle torso angle

Each generation may produce a slightly different elegant editorial pose.

------------------------------------------------
FRAMING LOCK (WAIST-UP)
------------------------------------------------

Camera framing must be waist-up.

Only the upper body of the model and the bodice of the dress should be visible.

The skirt, hemline and train must NOT be visible.

Focus on:

• neckline
• sleeves
• corset structure
• bodice lace
• embroidery details

Maximum couture detail visibility.

------------------------------------------------
BACKGROUND LOCK (IMAGE 3)
------------------------------------------------

Use Image 3 as the exact studio background.

Do NOT change:

• background color
• gradient
• lighting direction
• light intensity

The model must stand in front of the exact same background.

------------------------------------------------
LIGHTING
------------------------------------------------

Match lighting from Image 3.

Soft studio lighting
low contrast editorial lighting

------------------------------------------------
CAMERA
------------------------------------------------

Waist-up framing
horizontal composition
85mm fashion photography lens
editorial portrait style

------------------------------------------------
QUALITY TARGET
------------------------------------------------

Ultra photorealistic
maximum couture fabric detail
high resolution fashion portrait
luxury bridal editorial photography

------------------------------------------------
NEGATIVE
------------------------------------------------

No dress redesign
No lace distortion
No seam warping
No hairstyle change
No accessories
No text
No watermark
No anatomy errors

Editorial bridal fashion photography inspired by modern Vogue bridal campaigns. high-detail couture macro emphasis on bodice and lace
------------------------------------------------
[END TECHNICAL PROMPT BLOCK]
`;


// ================================================
// LOCATION VIEW PROMPT — On-Location Fashion Shoot
// ================================================
export const LOCATION_VIEW_PROMPT = `
[START TECHNICAL PROMPT BLOCK]
------------------------------------------------
NANO BANANA PRO – ULTRA BRIDAL GARMENT LOCK PROMPT
LOCATION SHOOT — ON-LOCATION FASHION PHOTOGRAPHY

INPUT REFERENCES

Image 1:
Wedding dress on mannequin (MASTER GARMENT REFERENCE)

Image 2:
Female model reference (MODEL IDENTITY REFERENCE)

Image 3:
Location / venue photograph (LOCATION REFERENCE)

------------------------------------------------
MASTER RULE
------------------------------------------------

Treat the wedding dress as a locked couture product.

The AI must behave like a professional fashion photographer shooting a bridal editorial ON LOCATION.

This is NOT a generative redesign task.

The gown must remain visually identical to the original reference.

The model wearing the dress must be placed INTO the location from Image 3.

------------------------------------------------
LOCATION INTEGRATION (CRITICAL)
------------------------------------------------

The model wearing the bridal gown must be placed naturally into the environment shown in Image 3.

The location must be the PRIMARY background and setting.

Integration rules:

• match the lighting direction and color temperature of the location
• cast natural shadows consistent with the environment
• match the perspective and camera angle of the location photo
• the model's feet must be grounded naturally on the location surface
• environmental reflections on fabric must be consistent
• atmospheric effects (haze, golden hour, ambient light) must match

The result must look like the model was actually photographed at this location.

STRICTLY FORBIDDEN:
• ignoring the location image
• using studio background instead of location
• floating model not grounded in scene
• mismatched lighting between model and location
• mismatched perspective

------------------------------------------------
GARMENT TRANSFER TASK
------------------------------------------------

Remove the mannequin completely.

Place the exact same bridal gown from Image 1 onto the woman from Image 2.

Place the dressed model INTO the environment from Image 3.

The garment must remain unchanged.

The dress must appear naturally worn by the model in the location setting.

------------------------------------------------
GARMENT IDENTITY LOCK
------------------------------------------------

Preserve all garment design elements exactly:

• lace patterns
• beadwork placement
• embroidery details
• sleeve lace transparency
• sleeve construction
• neckline shape
• corset structure
• seam lines
• waist structure
• skirt panel construction
• hemline shape
• train structure
• appliqué placements
• stitching details

Do NOT redesign the gown.

------------------------------------------------
GARMENT GEOMETRY LOCK
------------------------------------------------

Maintain the original silhouette.

• corset lines must remain straight
• lace must not move or shift
• sleeves must keep original structure
• skirt panels must remain identical
• hemline must remain unchanged
• train must keep the same length and shape

No garment distortion allowed.

------------------------------------------------
COUTURE DETAIL PRESERVATION
------------------------------------------------

Preserve couture micro details:

• lace thread texture
• embroidery density
• bead reflections
• satin or silk highlights
• fabric thickness
• seam stitching visibility

Do not smooth or simplify textures.

------------------------------------------------
COUTURE FABRIC PHYSICS
------------------------------------------------

Simulate realistic bridal couture fabric behavior IN the location environment.

• gravity affecting skirt weight
• natural corset tension
• realistic waist compression
• natural draping across hips
• layered skirt weight distribution
• soft folds where fabric gathers
• train spreading naturally on the location floor/ground
• wind or breeze effects if the location suggests outdoor setting

The dress must behave like real fabric in the given environment.

------------------------------------------------
MODEL IDENTITY LOCK
------------------------------------------------

Use the woman from Image 2.

Face must remain identical.

Preserve:

• facial structure
• skin tone
• eye shape
• lips
• nose
• facial proportions

Do not alter facial identity.

------------------------------------------------
HAIR GEOMETRY LOCK — CRITICAL
------------------------------------------------

Hair must remain EXACTLY identical to the reference model image.

Hair must remain OPEN and NATURAL.

Do NOT create or simulate any bridal hairstyle.

STRICTLY FORBIDDEN:
• bun
• updo
• braided hairstyle
• any hairstyle modification

Hair silhouette, length, and direction must remain identical to the reference.

------------------------------------------------
POSE – LOCATION APPROPRIATE
------------------------------------------------

The model should create elegant bridal fashion poses appropriate for the location.

Pose characteristics:

• natural relaxed pose suited to the environment
• interaction with location elements when natural
• elegant hand placement
• body positioned naturally within the scene

The poses must remain:

• calm
• elegant
• natural
• editorial fashion style

------------------------------------------------
LIGHTING
------------------------------------------------

Match the lighting of the location photograph.

If outdoor: natural sunlight, golden hour, or ambient daylight
If indoor: match interior lighting conditions

Ensure consistent lighting between the model and the environment.

------------------------------------------------
CAMERA
------------------------------------------------

Full body framing
Match the focal length and perspective of the location photo
High resolution fashion image

------------------------------------------------
QUALITY TARGET
------------------------------------------------

Ultra photorealistic
hyper detailed couture fabric
luxury bridal editorial on-location photography
natural skin texture
seamless environment integration

------------------------------------------------
NEGATIVE
------------------------------------------------

No dress redesign
No lace distortion
No seam warping
No missing embroidery
No hairstyle change
No crown
No necklace
No accessories
No text
No watermark
No anatomy errors
No studio background (use the location)
No floating model
No mismatched lighting
No mismatched perspective
------------------------------------------------
[END TECHNICAL PROMPT BLOCK]
`;


// ================================================
// OUTDOOR BACKGROUND PROMPT — Location Background Generator
// ================================================
export const OUTDOOR_BACKGROUND_PROMPT = `
[START TECHNICAL PROMPT BLOCK]
------------------------------------------------
NANO BANANA PRO – OUTDOOR BRIDAL PORTRAIT BACKGROUND

------------------------------------------------
SCENE TYPE
------------------------------------------------

Create an outdoor luxury fashion photography background designed for waist-up and close portrait bridal shoots.

No people in the scene.

This image will serve as a background plate for a bridal editorial portrait.

------------------------------------------------
LOCATION
------------------------------------------------

A historic European castle surrounded by a vast botanical garden.

Visible environment elements should include:

• elegant stone castle architecture softly visible in background
• manicured botanical garden hedges
• blooming flowers and plants
• classical garden pathways
• decorative stone sculptures
• elegant garden symmetry

The garden must feel luxurious and romantic.

------------------------------------------------
BACKGROUND DEPTH
------------------------------------------------

The background should be optimized for fashion portrait photography.

• mid-distance garden composition
• soft background depth
• subtle perspective compression
• cinematic depth of field

The environment must appear natural behind a waist-up bridal model.

------------------------------------------------
LIGHTING
------------------------------------------------

Professional outdoor fashion lighting.

• soft diffused daylight
• golden-hour inspired tone
• balanced highlights on plants and architecture
• low contrast luxury editorial lighting

------------------------------------------------
CAMERA STYLE
------------------------------------------------

Portrait fashion photography style.

Waist-up framing environment
85mm portrait lens look
shallow depth of field

The background must remain softly detailed but not distracting.

------------------------------------------------
ATMOSPHERE
------------------------------------------------

Romantic luxury bridal editorial environment.

High-end European bridal campaign aesthetic.

------------------------------------------------
QUALITY
------------------------------------------------

Ultra photorealistic
hyper detailed environment
cinematic outdoor portrait background

------------------------------------------------
NEGATIVE
------------------------------------------------

No people
No models
No mannequins
No dresses
No animals
No text
No watermark.   portrait background compression with soft botanical garden blur
------------------------------------------------
[END TECHNICAL PROMPT BLOCK]
`;
