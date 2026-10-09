import { useState } from "react"

import  DataTable  from "@/components/admin/DataTable"
import { messageColumns } from "@/columns/messageColumns"

import {
  useMessages,
  useMessage,
  useDeleteMessage,
} from "@/hooks/useMessages"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"

import { Button } from "@/components/ui/button"

const Messages = () => {
  const [selectedMessage, setSelectedMessage] =
    useState(null)

  const [detailsOpen, setDetailsOpen] =
    useState(false)

  const [deleteOpen, setDeleteOpen] =
    useState(false)

  const {
    data,
    isLoading,
    isError,
    error,
  } = useMessages()

  const {
    data: messageData,
    isLoading: messageLoading,
    isError: messageError,
  } = useMessage(selectedMessage?._id)

  const deleteMutation = useDeleteMessage()

  const messages = data?.data ?? []

  const message = messageData?.data

  const handleView = (message) => {
    setSelectedMessage(message)
    setDetailsOpen(true)
  }

  const handleDelete = (message) => {
    setSelectedMessage(message)
    setDeleteOpen(true)
  }

  const handleConfirmDelete = () => {
    if (!selectedMessage?._id) return

    deleteMutation.mutate(selectedMessage._id, {
      onSuccess: () => {
        setDeleteOpen(false)
        setSelectedMessage(null)
      },
    })
  }

  const handleDetailsOpenChange = (open) => {
    setDetailsOpen(open)

    if (!open) {
      setSelectedMessage(null)
    }
  }

  const columns = messageColumns({
    onView: handleView,
    onDelete: handleDelete,
  })

  return (
    <div>
      {/* Page Header */}
      <div className="flex items-center justify-between mb-6 text-left">
        <div>
          <h1 className="text-xl font-semibold text-ink">
            Messages
          </h1>

          <p className="text-[12px] text-ink-muted mt-1">
            Manage messages received from your portfolio.
          </p>
        </div>
      </div>

      {/* Error */}
      {isError && (
        <div className="mb-4 text-[11px] text-destructive">
          {error?.response?.data?.message ||
            "Unable to load messages."}
        </div>
      )}

      {/* Table */}
      <DataTable
        columns={columns}
        data={messages}
        loading={isLoading}
      />

      {/* Message Details */}
      <Dialog
        open={detailsOpen}
        onOpenChange={handleDetailsOpenChange}
      >
        <DialogContent
          className="
            w-[calc(100vw-2rem)]
            sm:max-w-150
            max-h-[85vh]
            overflow-y-auto
            rounded-none
            bg-card
            border-edge
            text-ink
            p-6
          "
        >
          <DialogHeader className="mb-6">
            <DialogTitle className="text-[15px] font-semibold text-ink">
              Message Details
            </DialogTitle>

            <DialogDescription className="text-[11px] text-ink-muted">
              View the message and manage your response.
            </DialogDescription>
          </DialogHeader>

          {messageLoading && (
            <div className="py-10 text-center text-[11px] text-ink-muted">
              Loading message...
            </div>
          )}

          {messageError && (
            <div className="py-10 text-center text-[11px] text-destructive">
              Unable to load this message.
            </div>
          )}

          {message && (
            <div className="space-y-6">
              {/* Sender */}
              <div className="space-y-3">
                <div>
                  <p className="text-[10px] text-ink-muted uppercase">
                    Name
                  </p>

                  <p className="text-[12px] text-ink mt-1">
                    {message.name}
                  </p>
                </div>

                <div>
                  <p className="text-[10px] text-ink-muted uppercase">
                    Email
                  </p>

                  <p className="text-[12px] text-ink mt-1">
                    {message.email}
                  </p>
                </div>

                <div>
                  <p className="text-[10px] text-ink-muted uppercase">
                    Received
                  </p>

                  <p className="text-[11px] text-ink-muted mt-1">
                    {new Date(
                      message.createdAt
                    ).toLocaleString()}
                  </p>
                </div>
              </div>

              {/* Original Message */}
              <div>
                <p className="text-[10px] text-ink-muted uppercase mb-2">
                  Message
                </p>

                <div
                  className="
                    rounded-none
                    bg-card-alt
                    p-4
                    text-[12px]
                    leading-6
                    text-ink
                    whitespace-pre-wrap
                  "
                >
                  {message.message}
                </div>
              </div>

              {/* Reply status */}
              <div className="flex items-center justify-between border-t border-edge pt-4">
                <div>
                  <p className="text-[10px] text-ink-muted uppercase">
                    Status
                  </p>

                  <p className="text-[11px] text-ink mt-1">
                    {message.replied
                      ? "Replied"
                      : "Awaiting response"}
                  </p>
                </div>

                {message.replied && message.repliedAt && (
                  <div className="text-right">
                    <p className="text-[10px] text-ink-muted uppercase">
                      Replied
                    </p>

                    <p className="text-[11px] text-ink-muted mt-1">
                      {new Date(
                        message.repliedAt
                      ).toLocaleString()}
                    </p>
                  </div>
                )}
              </div>

              {/* Reply section will be added in Stage 3 */}
              {!message.replied && (
                <div className="border-t border-edge pt-5">
                  <Button
                    type="button"
                    className="
                      rounded-none
                      bg-accent
                      text-[#382400]
                      text-[11px]
                      hover:bg-accent/90
                    "
                  >
                    GENERATE AI RESPONSE
                  </Button>
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Delete Dialog */}
      <AlertDialog
        open={deleteOpen}
        onOpenChange={setDeleteOpen}
      >
        <AlertDialogContent
          className="
            rounded-none
            bg-card
            border-edge
            text-ink
          "
        >
          <AlertDialogHeader>
            <AlertDialogTitle className="text-[15px] font-semibold text-ink">
              Delete Message
            </AlertDialogTitle>

            <AlertDialogDescription className="text-[11px] text-ink-muted">
              Are you sure you want to delete this message?
              This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>

          <AlertDialogFooter>
            <AlertDialogCancel
              className="
                rounded-none
                border-edge
                text-[11px]
              "
            >
              Cancel
            </AlertDialogCancel>

            <AlertDialogAction
              onClick={handleConfirmDelete}
              disabled={deleteMutation.isPending}
              className="
                rounded-none
                bg-accent
                text-[#382400]
                text-[11px]
                hover:bg-accent/90
              "
            >
              {deleteMutation.isPending
                ? "Deleting..."
                : "DELETE MESSAGE"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}

export default Messages