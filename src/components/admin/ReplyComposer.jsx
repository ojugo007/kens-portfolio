import { useState } from "react"
import { useEditor, EditorContent } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import {
  Bold,
  Italic,
  List,
  ListOrdered,
  Undo2,
  Redo2,
  Loader2,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

import {
  useGenerateMessage,
  useSendResponse,
} from "@/hooks/useMessages"

const ToolbarButton = ({ onClick, active, disabled, label, children }) => (
  <Button
    type="button"
    variant="ghost"
    size="icon"
    onClick={onClick}
    disabled={disabled}
    aria-label={label}
    className={cn(
      "h-7 w-7 rounded-none text-ink-muted",
      active && "bg-surface-alt text-ink"
    )}
  >
    {children}
  </Button>
)

const ReplyComposer = ({ messageId }) => {
  const [hasGenerated, setHasGenerated] = useState(false)

  const generateMutation = useGenerateMessage()
  const sendMutation = useSendResponse()

  const isBusy =
    generateMutation.isPending || sendMutation.isPending

  const editor = useEditor({
    extensions: [StarterKit],
    content: "",
    shouldRerenderOnTransaction: true,
    editorProps: {
      attributes: {
        class: cn(
          "min-h-64 p-4 outline-none text-[12px] leading-6 text-ink",
          "[&_p]:mb-3 [&_ul]:list-disc [&_ul]:pl-5 [&_ol]:list-decimal [&_ol]:pl-5",
          "[&_strong]:font-semibold [&_em]:italic"
        ),
      },
    },
  })

  const isEmpty = !editor || editor.getText().trim() === ""

  const handleGenerate = () => {
    if (
      editor &&
      !isEmpty &&
      !window.confirm("Replace the current draft with a new AI response?")
    ) {
      return
    }

    generateMutation.mutate(messageId, {
      onSuccess: (res) => {
        const html = res?.data?.reply ?? ""

        editor?.commands.setContent(html)
        setHasGenerated(true)
      },
    })
  }

  const handleSend = () => {
    if (!editor || isEmpty) return

    sendMutation.mutate({
      id: messageId,
      message: editor.getHTML(),
    })
  }

  return (
    <div className="border-t border-edge pt-5 space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-[10px] text-ink-muted uppercase">
          Response
        </p>

        <Button
          type="button"
          onClick={handleGenerate}
          disabled={isBusy}
          className="
            rounded-none
            bg-accent
            text-[#382400]
            text-[11px]
            hover:bg-accent/90
          "
        >
          {generateMutation.isPending && (
            <Loader2 className="mr-2 h-3 w-3 animate-spin" />
          )}
          {generateMutation.isPending
            ? "GENERATING..."
            : hasGenerated
            ? "REGENERATE"
            : "GENERATE AI RESPONSE"}
        </Button>
      </div>

      {generateMutation.isError && (
        <p className="text-[11px] text-destructive">
          {generateMutation.error?.response?.data?.message ||
            "Unable to generate a response."}
        </p>
      )}

      {hasGenerated && editor && (
        <>
          <div className="border border-edge bg-card-alt">
            {/* Toolbar */}
            <div className="flex items-center gap-1 border-b border-edge p-1">
              <ToolbarButton
                label="Bold"
                active={editor.isActive("bold")}
                onClick={() => editor.chain().focus().toggleBold().run()}
              >
                <Bold className="h-3.5 w-3.5" />
              </ToolbarButton>

              <ToolbarButton
                label="Italic"
                active={editor.isActive("italic")}
                onClick={() => editor.chain().focus().toggleItalic().run()}
              >
                <Italic className="h-3.5 w-3.5" />
              </ToolbarButton>

              <ToolbarButton
                label="Bullet list"
                active={editor.isActive("bulletList")}
                onClick={() => editor.chain().focus().toggleBulletList().run()}
              >
                <List className="h-3.5 w-3.5" />
              </ToolbarButton>

              <ToolbarButton
                label="Numbered list"
                active={editor.isActive("orderedList")}
                onClick={() => editor.chain().focus().toggleOrderedList().run()}
              >
                <ListOrdered className="h-3.5 w-3.5" />
              </ToolbarButton>

              <div className="ml-auto flex items-center gap-1">
                <ToolbarButton
                  label="Undo"
                  disabled={!editor.can().undo()}
                  onClick={() => editor.chain().focus().undo().run()}
                >
                  <Undo2 className="h-3.5 w-3.5" />
                </ToolbarButton>

                <ToolbarButton
                  label="Redo"
                  disabled={!editor.can().redo()}
                  onClick={() => editor.chain().focus().redo().run()}
                >
                  <Redo2 className="h-3.5 w-3.5" />
                </ToolbarButton>
              </div>
            </div>

            <EditorContent editor={editor} />
          </div>

          <p className="text-[10px] text-ink-muted">
            AI-generated draft. Review and edit before sending.
          </p>

          {sendMutation.isError && (
            <p className="text-[11px] text-destructive">
              {sendMutation.error?.response?.data?.message ||
                "Unable to send the response."}
            </p>
          )}

          <div className="flex justify-end">
            <Button
              type="button"
              onClick={handleSend}
              disabled={isEmpty || isBusy}
              className="
                rounded-none
                bg-accent
                text-[#382400]
                text-[11px]
                hover:bg-accent/90
              "
            >
              {sendMutation.isPending && (
                <Loader2 className="mr-2 h-3 w-3 animate-spin" />
              )}
              {sendMutation.isPending ? "SENDING..." : "SEND RESPONSE"}
            </Button>
          </div>
        </>
      )}
    </div>
  )
}

export default ReplyComposer